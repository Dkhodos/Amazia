const EXPIRATION = 30 * 60; // 30 min
const SESSION_LS_KEY = "amazia-joined-session"

interface JoinedSession{
    start: number
    end: number
}

function getNow(){
    return Math.floor(Date.now() / 1000);
}

function save(start?: number){
    const now = getNow();

    localStorage.setItem(SESSION_LS_KEY, JSON.stringify({
        start: start ?? now,
        end: now + EXPIRATION
    }))
}

function get(){
    const session = localStorage.getItem(SESSION_LS_KEY);

    return session ? JSON.parse(session) as JoinedSession : null;
}

export default function getSession(){
    const now = getNow();

    const joinedSession = get();
    if(joinedSession){
        if(joinedSession.end <= now){
            save();

            return get()!.start;
        }

        save(joinedSession.start);

        return joinedSession.start;
    } else {
        save();

        return get()!.start;
    }
}