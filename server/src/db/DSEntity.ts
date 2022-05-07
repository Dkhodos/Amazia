import {DSGlobal} from "../../@types/datastore"
import { Datastore, Key } from '@google-cloud/datastore';
import path from "path";
import console from "console";

type Filters = Record<string,boolean | string | number | Key>

interface GetDSProps{
    filters?: Filters,
    order?: string,
}

interface FetchDSProps extends GetDSProps{
    limit?: number
}

interface Entity<T>{
    data: T,
    meta: {
        kind: string,
        keyId: number
    }
}


export default abstract class DSEntity<T>{
    static getDatastore(): Datastore{
        const ds =  (global as DSGlobal).datastore;
        if(!ds){
            console.log("init datastore amazia_db:adept-bridge-349115");

            (global as DSGlobal).datastore = new Datastore({
                // @ts-ignore
                projectId: 'adept-bridge-349115',
                keyFilename: path.resolve(__dirname, "../../ds_key.json")
            });

        }
        return (global as DSGlobal).datastore;
    }

    ds: Datastore;
    key: Key;

    abstract getKeys(): string[]

    constructor(){
        this.ds = DSEntity.getDatastore();
    }

    new(entityData: T){
        const ds = DSEntity.getDatastore();

        const entity = {
            key: ds.key(this.getKeys()),
            data: entityData
        }

        return ds.save(entity);
    }

    async isExist({filters,order}:GetDSProps): Promise<boolean>{
        const entity = await this.get({filters, order});

        return Boolean(entity);
    }

    async get({filters,order}:GetDSProps): Promise<Entity<T>>{
        const entity = await getWithFilter<T>({filters, order, key: this.getKeys()[0], limit: 1});

        return entity ? entity[0] : null;
    }

    async fetch({filters, limit, order}:FetchDSProps): Promise<Entity<T>[]>{
        const entity = await getWithFilter<T>({filters, order, key: this.getKeys()[0], limit});

        return entity;
    }

    async all({order}:Omit<GetDSProps, "filters">): Promise<Entity<T>[]>{
        const entity = await this.fetch({order, limit: -1});

        return entity;
    }

    async delete(filters: Filters){
        const ds = DSEntity.getDatastore();

        const entity = await this.get({filters});

        if(entity){
            const entityKey = entity.meta.keyId;

            const key = ds.key([...this.getKeys(), entityKey]);

            await ds.delete(key);

            return true;
        }

        return false;
    }

    async update(filters: Filters, getNewEntity: (old: Entity<T>) => T){
        const ds = DSEntity.getDatastore();

        const entity = await this.get({filters});

        if(entity){
            const entityKey = entity.meta.keyId;

            const key = ds.key([...this.getKeys(), entityKey]);

            const transaction = ds.transaction();

            try {
              await transaction.run();

              const newEntity = getNewEntity(entity);

              transaction.save({
                key: key,
                data: newEntity,
              });
              await transaction.commit();

              return newEntity;
            } catch (err) {
              await transaction.rollback();
              console.error(err);
              return null;
            }
        }

        return null;
    }
}

async function getWithFilter<T>({filters={}, key, order, limit = 100}: {key:string, filters?: Filters, order?: string, limit?: number}): Promise<Entity<T>[] | null>{
    console.log(`new query: ${key}, filters=${JSON.stringify(filters)}`);
    
    const ds = DSEntity.getDatastore();

    const query = ds.createQuery(key);

    Object.entries(filters).forEach(([filterKey, filterValue]) => {
        query.filter(filterKey,"=", filterValue);
    });

    if(order){
        query.order('name');
    }

    if(limit !== -1){
        query.limit(limit);
    }

    const entities = await ds.runQuery(query);
    if(entities[0].length === 0){
        return null;
    }

    return entities[0].map(entity => ({
        data: entity,
        meta: {
            keyId: Number(entity[ds.KEY].id),
            kind: entity[ds.KEY].name
        }
    }))
}