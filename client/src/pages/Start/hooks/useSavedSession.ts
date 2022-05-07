import { useEffect } from "react";

const STEP_LS_KEY = "step_session_saved";
const LOGS_LS_KEY = "logs_session_saved"

const TIMEOUT = 360;

interface LSData<T>{
    timer: number,
    payload: T
}


export default function useSavedSession() {
    function getNow(){
        return Date.now() / 1000;
    }

    function clear(){
        localStorage.removeItem(LOGS_LS_KEY);
        localStorage.removeItem(STEP_LS_KEY);
    }

    function get<T>(key: string): LSData<T> | null{
        const item = localStorage.getItem(key);
        if(!item){
            return null;
        }

        const parsed = JSON.parse(item) as LSData<T>
        const now = getNow();
        if(parsed.timer <= now){
            clear();
            return null;
        }

        return parsed;
    }

    function set<T>(key: string, value: T){
        const now = getNow();
        
        localStorage.setItem(key,JSON.stringify({
            timer: now,
            payload: value
        } as LSData<T>));
    }

    return {
        clear,
        getSession: () => ({
            step: get<number>(STEP_LS_KEY),
            logs: get<number[]>(LOGS_LS_KEY)
        }),
        updateSession: (step: number, logs: number[]) => {
            set<number>(STEP_LS_KEY, step);
            set<number[]>(LOGS_LS_KEY, logs);
        }
    }
}