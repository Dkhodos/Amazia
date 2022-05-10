const AMAZIA_SESSION_LS_KEY = "saved-amazia-session"

const TIMEOUT = 360;

export interface AmaziaSessionProps{
    timer: number,
    payload: LSPayload
}

interface LSPayload{
    step: number,
    logs: boolean[],
    quizIndex: number
    time: number
}


export default function useSavedSession() {
    function getNow(){
        return Date.now() / 1000;
    }

    function clear(){
        localStorage.removeItem(AMAZIA_SESSION_LS_KEY);
    }

    function get():LSPayload | null{
        const item = localStorage.getItem(AMAZIA_SESSION_LS_KEY);
        if(!item){
            return null;
        }

        const parsed = JSON.parse(item) as AmaziaSessionProps
        const now = getNow();
        if(parsed.timer <= now){
            clear();
            return null;
        }

        return parsed.payload;
    }

    function set(value: LSPayload){        
        localStorage.setItem( AMAZIA_SESSION_LS_KEY,JSON.stringify({
            timer: getNow() + TIMEOUT,
            payload: value
        } as AmaziaSessionProps));
    }

    return {
        clearSession: clear,
        getSession: () => {

            const session = get();

            return {
                step: session ? session.step : null,
                logs: session ? session.logs : null,
                quizIndex: session ? session.quizIndex : null,
                time: session ? session.time : null,
            }
        },
        updateSession: (props: LSPayload) => {
            set(props);
        },
    }
}