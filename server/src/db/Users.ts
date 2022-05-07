import DSEntity from "./DSEntity";

export interface User{
    id: string,
    name: string,
}

export default class Users extends DSEntity<User>{
    getKeys(): string[] {
        return ["Users"];
    }

    async getWithId(id: string){
        const user = await this.get({
            filters: {
                id
            }
        });

        return user ?? null;
    }

    async createNewUser(id: string, name: string) {
        const isExist = Boolean(await this.getWithId(id));
        if(isExist){
            return null;
        }

        const newUser:User = {
            id: String(id),
            name,
        };

        try{
            await this.new(newUser);

            return newUser;
        } catch(e){
            return null;
        }
    }

    deleteById(id: string){
        return this.delete({id});
    }

    updateById(id: string, changes: Partial<User>){
        return this.update({id}, (old) => ({
            ...old.data,
            ...changes
        }));
    }
}