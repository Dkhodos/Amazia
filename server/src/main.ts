import console from "console";
import express, {Request} from "express";
import path from "path";
import fs from "fs/promises"
import cors from "cors";

// init express
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const port = 8000;


app.get("/questions", async (req:Request, res) => {
    const questions = await fs.readFile(path.resolve(__dirname, "static/questions.json"), 'utf-8');

    const index = req.query["index"] ?? 0

    res.set('Cache-control', 'public, max-age=300')
    res.json(JSON.parse(questions)[Number(index)]);
});

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );