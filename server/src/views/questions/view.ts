import express from 'express';
import fs from "fs/promises";
import path from "path";
import { getRandomQuestions } from './questions.utils';

const questionsView = express.Router();
questionsView.use((req, res, next) => {
    res.set('Cache-control', 'public, max-age=300');
    next()
})


async function getQuestions(){
    const questions = await fs.readFile(path.resolve(__dirname, "./questions.json"), 'utf-8');

    return JSON.parse(questions);
}

// define the home page route
questionsView.get('/',  async (req, res) => {
    const questions = await getQuestions();
    const params = req.params;

    if(!("id" in params)){
        res.json({
            error: true,
            msg: "Missing user ID!"
        });
    }

    const randomIndex = await getRandomQuestions(questions.length, String((params as any).id));

    res.json(questions[randomIndex]);
});

questionsView.get('/:index',  async (req, res) => {
    const questions = await getQuestions();

    const index = Number(req.params.index);
    if(questions[index]){
        res.json(questions[index]);
    }
});




export default questionsView;