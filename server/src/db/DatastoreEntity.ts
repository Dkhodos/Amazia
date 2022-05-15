import { Datastore, Key } from '@google-cloud/datastore';
import path from "path";
import Logger from '../logger/Logger';

type Filters = Record<string,boolean | string | number | Key>

export interface GetDSProps{
    filters?: Filters,
    order?: string,
    createIfNone?: boolean
    limit?: number
}

interface defaults{
    key: Key
    keyName: number
    kind: string
}

export function createDatastore(){
    try{
        if(process.env.NODE_ENV === 'production'){
            (global as any).datastore = new Datastore();
        } else {
            (global as any).datastore = new Datastore({
                projectId: process.env.PROJECT_ID,
                keyFilename: path.resolve(__dirname, "../../ds_key.json")
            });
        }
    } catch(e){
        Logger.ERROR("DS Failed to Load:\n" + e);

        throw new Error(e);
    }
}


export default abstract class DatastoreEntity<Scheme extends Object>{
    key: Key
    keyName: number
    kind: string
    
    static KEYS: string[]
    
    static DEFAULTS: any = {
        key: this.getDatastore().key([]),
        keyName: 0,
        kind: ""
    }

    static getDatastore(): Datastore{
        if(!(global as any).datastore){
            createDatastore();
        }
    
        return (global as any).datastore;
    }

    constructor({key,keyName, kind}:{key?: Key, keyName?: number, kind ?: string, scheme?: Scheme}){
        this.key = key ?? DatastoreEntity.DEFAULTS.key;
        this.keyName = keyName ?? DatastoreEntity.DEFAULTS.keyName;
        this.kind = kind ?? DatastoreEntity.DEFAULTS.kind;
    }

    abstract constructKey (): Key

    private static async getWithFilter<Scheme extends Object, K extends DatastoreEntity<Scheme>>({filters, createIfNone,order, limit}:GetDSProps): Promise<K[]>{
        const datastore = DatastoreEntity.getDatastore();
        
        const query = datastore.createQuery(DatastoreEntity.KEYS);
    
        Object.entries(filters).forEach(([filterKey, filterValue]) => {
            query.filter(filterKey,"=", filterValue);
        });
    
        if(order){
            query.order('name');
        }
    
        if(limit !== -1){
            query.limit(limit);
        }
    
        Logger.INFO(`datastore query: ${query}, filters=${JSON.stringify(filters)} | order=${order} | limit=${limit}`);    

        const entities = await datastore.runQuery(query);

        return entities[0].map(entity => {
            const key = datastore.key(DatastoreEntity.KEYS)
            const keyName = Number(entity[datastore.KEY].id);
            const kind = entity[datastore.KEY].name

            return Reflect.construct(this, [{key, keyName, kind, scheme: entity as Scheme}]);
        });
    }

    static async get<Scheme extends Object, K extends DatastoreEntity<Scheme>>({ filters, createIfNone = false,order}:GetDSProps): Promise<K>{
        const entities = await DatastoreEntity.getWithFilter<Scheme ,K>({
            filters, order, limit: 1
        });

        if(entities.length === 0 && createIfNone){
            return this.new<Scheme, K>();
        }

        return entities ? entities[0] : null;
    }

    static new<Scheme extends Object, K extends DatastoreEntity<Scheme>>(scheme?: Scheme): K{
        return Reflect.construct(this,[{scheme:scheme ?? this.DEFAULTS}])
    }

    static async fetch<Scheme extends Object, K extends DatastoreEntity<Scheme>>({ filters, createIfNone = false,order, limit = 10000}:GetDSProps): Promise<K[]>{
        const entities = await DatastoreEntity.getWithFilter<Scheme, K>({
            filters, order, limit
        });

        if(entities.length === 0 && createIfNone){
            return [this.new<Scheme, K>()];
        }

        return entities;
    }

    async save(scheme?: Scheme){
        const datastore = DatastoreEntity.getDatastore();

        if(this.key){
            await datastore.save({
                key: this.key,
                data: scheme
            });
        } else {
            await datastore.save({
                key: this.constructKey(),
                data: scheme
            });
        }

        return true;
    }

    async delete(){
        const datastore = DatastoreEntity.getDatastore();

        try {
            await datastore.delete(this.key);
        } catch(e){
            console.error(e);

            return false;
        }

        return true;
    }
}