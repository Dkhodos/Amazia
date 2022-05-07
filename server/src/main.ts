import 'dotenv/config'
import express from "express";
import apiView from './views';

// init express
const app = express();

// middleware
app.use(express.json());

const port = process.env.PORT ?? 8000;

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.use("/api", apiView);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );