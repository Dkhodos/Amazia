import { Logging, SeverityNames } from "@google-cloud/logging";
import path from "path";

function createLogger(){
    if(process.env.NODE_ENV === 'production'){
        (global as any).logging = new Logging();
    } else {
        (global as any).logging = new Logging({
            projectId: process.env.PROJECT_ID,
            keyFile: path.resolve(__dirname, "../../ds_key.json")
        });
    }
}

function getLogger(){
    if(!(global as any).logging){
        createLogger();
    }

    return (global as any).logging as Logging;
}

const LOGGER_NAME = "AMAZIA"


interface Props{
    message: string
    severity: SeverityNames
}

export default class Logger{
    private static LOG({message, severity}:Props){
        const logging = getLogger();

        const log = logging.log(LOGGER_NAME);
      
        const metadata = {
          resource: {type: 'global'},
          severity,
        };
      
        // Prepares a log entry
        const entry = log.entry(metadata, message);
      
        async function writeLog() {
          await log.write(entry);
        }

        writeLog().then(() => {
            if(process.env.NODE_ENV !== 'production'){
                console.log(`Logged: ${severity} | ${message}`);
            }
        });
    }

    static INFO(message: string){
        Logger.LOG({message, severity: "info"});
    }

    static WARNING(message: string){
        Logger.LOG({message, severity: "warning"});
    }

    static ERROR(message: string){
        Logger.LOG({message, severity: "error"});
    }
}