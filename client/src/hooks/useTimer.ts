import { useEffect, useState } from "react"


export default function useTimer(){
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
      let interval = 0;
      if (running) {
        interval = window.setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running]);

    return {
        start: () => setRunning(true),
        stop: () => setRunning(false),
        set: (time: number) => setTime(time),
        time,
    }
}