import DSEntity from "./DSEntity";
import { Key } from '@google-cloud/datastore';
import Users from "./Users";


export interface Activity{
    user: Key,
    quizIndex: number,
    logs: boolean[],
    date: number //timestamp (ISR)
    time: number // minutes
    userAgent: string
}

export default class Activities extends DSEntity<Activity>{
    getKeys(): string[] {
        return ["Activities"];
    }

    async addActivity(id: string, activity: Omit<Activity, "date" | "user" | "userAgent">, userAgent: string){
        const user = await ((new Users()).getWithId(id));

        if(!user){
            console.error("No user found for " +id);

            return null;
        }

        const ds = DSEntity.getDatastore();
        const key = ds.key(["Users", user.meta.keyId])

        const newActivity:Activity = {
            ...activity,
            date: Date.now(),
            userAgent,
            user: key
        }

        try{
            await this.new(newActivity);

            return newActivity;
        } catch(e){
            return null;
        }
    }

    async getUserActivities(id: string): Promise<number[]>{
        const user = await ((new Users()).getWithId(id));

        if(!user){
            return [];
        }

        const ds = DSEntity.getDatastore();
        const key = ds.key(["Users", user.meta.keyId])

        const activities = await ((new Activities()).fetch({
            filters: {
                user: key
            }
        }));

        return activities ? activities.map(activity => activity.data.quizIndex) : []
    }
}