import { Activity } from "../../db/Activities";

export function isValidActivity(activity: Omit<Activity, "date" | "user" | "userAgent">){
    if(!activity.logs || !Array.isArray(activity.logs)  || activity.logs.length !== 10){        
        return {
            valid: false,
            reason: "missing / invalid activity.logs"
        };
    }

    if(!activity.quizIndex){
        return {
            valid: false,
            reason: "missing activity.date"
        };
    }

    if(!activity.time){
        return {
            valid: false,
            reason: "missing activity.time"
        };
    }

    return {
        valid: true,
        reason: ""
    }
}