import 'dotenv/config'
import express from "express";
import apiView from './views';
import userAgent from "express-useragent";
import { createDatastore } from './db/DatastoreEntity';

// init express
const app = express();

// middleware
app.use(express.json());
app.use(userAgent.express());

const port = process.env.PORT ?? 8080;

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.get("/_ah/health", (req, res) => {
    res.send('OK!')
})

app.get("/_ah/start", (req, res) => {
    res.send('OK!')
})


app.use("/api", apiView);

app.listen( port, () => {
    if(process.env.NODE_ENV !== 'production'){
        console.log( `server started at http://localhost:${ port }` );
    }
    createDatastore();
} );