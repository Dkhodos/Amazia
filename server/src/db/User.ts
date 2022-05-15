import { Key } from "@google-cloud/datastore"
import DatastoreEntity, { GetDSProps } from "./DatastoreEntity"

interface UserScheme{
    id: string,
    name: string
}

export default class User extends DatastoreEntity<UserScheme>{
    static KEYS: string[] = ["Users"]
    static DEFAULTS: UserScheme = {
        id: "111111111",
        name: "test"
    }

    id: string
    name: string

    constructKey(): Key {
        const datastore = DatastoreEntity.getDatastore();

        return datastore.key([...User.KEYS, this.id])
    }

    constructor({key,keyName,kind, scheme}:{key?: Key, keyName?: number, kind ?: string, scheme: UserScheme}){
        super({key, keyName, kind});

        this.id = scheme.id;
        this.name = scheme.name;
    }
    
    static async getItem<Scheme extends Object, K extends DatastoreEntity<Scheme>>(props: GetDSProps): Promise<K> {
        return DatastoreEntity.get<UserScheme, User>(props)
    }

    toJson(){
        return{
            id: this.id,
            name: this.name
        }
    }
}