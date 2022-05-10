import { Datastore, Key } from '@google-cloud/datastore';
import path from "path";

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


function newDatastore(){
    if(process.env.NODE_ENV === 'production'){
        return new Datastore();
    } else {
        return new Datastore({
            // @ts-ignore
            projectId: 'adept-bridge-349115',
            keyFilename: path.resolve(__dirname, "../../ds_key.json")
        });
    }
}

export default abstract class DSEntity<T>{
    datastore: Datastore | null;
    key: Key;

    abstract getKeys(): string[]


    constructor(datastore?:Datastore){
        this.datastore = datastore ?? newDatastore();
    }

    new(entityData: T){
        const entity = {
            key: this.datastore.key(this.getKeys()),
            data: entityData
        }

        return this.datastore.save(entity);
    }

    async isExist({filters,order}:GetDSProps): Promise<boolean>{
        const entity = await this.get({filters, order});

        return Boolean(entity);
    }

    async get({filters,order}:GetDSProps): Promise<Entity<T>>{
        const entity = await getWithFilter<T>({filters, order, key: this.getKeys()[0], limit: 1, datastore: this.datastore});

        return entity ? entity[0] : null;
    }

    async fetch({filters, limit, order}:FetchDSProps): Promise<Entity<T>[]>{
        const entity = await getWithFilter<T>({filters, order, key: this.getKeys()[0], limit, datastore: this.datastore});

        return entity;
    }

    async all({order}:Omit<GetDSProps, "filters">): Promise<Entity<T>[]>{
        const entity = await this.fetch({order, limit: -1});

        return entity;
    }

    async delete(filters: Filters){
        const entity = await this.get({filters});

        if(entity){
            const entityKey = entity.meta.keyId;

            const key = this.datastore.key([...this.getKeys(), entityKey]);

            await this.datastore.delete(key);

            return true;
        }

        return false;
    }

    async update(filters: Filters, getNewEntity: (old: Entity<T>) => T){
        const entity = await this.get({filters});

        if(entity){
            const entityKey = entity.meta.keyId;

            const key = this.datastore.key([...this.getKeys(), entityKey]);

            const transaction = this.datastore.transaction();

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

async function getWithFilter<T>({filters={}, key, order, limit = 100, datastore}: {key:string, filters?: Filters, order?: string, limit?: number, datastore: Datastore}): Promise<Entity<T>[] | null>{
    console.log(`new query: ${key}, filters=${JSON.stringify(filters)}`);
    

    const query = datastore.createQuery(key);

    Object.entries(filters).forEach(([filterKey, filterValue]) => {
        query.filter(filterKey,"=", filterValue);
    });

    if(order){
        query.order('name');
    }

    if(limit !== -1){
        query.limit(limit);
    }

    const entities = await datastore.runQuery(query);
    if(entities[0].length === 0){
        return null;
    }

    //@ts-ignore
    return entities[0].map(entity => ({
        data: entity,
        meta: {
            keyId: Number(entity[datastore.KEY].id),
            kind: entity[datastore.KEY].name
        }
    }))
}