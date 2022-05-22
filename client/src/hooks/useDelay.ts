import {useEffect, useState} from "react";

export default function useDelay(timeout: number) {
    const [ready, setReady] = useState<Boolean>(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setReady(true);
        }, timeout)

        return () => {
            window.clearTimeout(timer);
        }
    }, [])

    return ready;
}