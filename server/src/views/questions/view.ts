import console from 'console';
import express from 'express';
import fs from "fs/promises";
import path from "path";
import ApiError from '../../utils/ApiError';
import { getRandomQuestions } from './questions.utils';

const questionsView = express.Router();
questionsView.use((req, res, next) => {
    //res.set('Cache-control', 'public, max-age=300');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next()
})


async function getQuestions(){
    const questions = await fs.readFile(path.resolve(__dirname, "../../../assets/questions.json"), 'utf-8');

    return JSON.parse(questions);
}

// define the home page route
questionsView.get('/',  async (req, res) => {
    const questions = await getQuestions();
    const params = req.query;

    if(ApiError.raiseOnMissingParams<any>(["id"], params, res)){
        return;
    }


    const randomIndex = await getRandomQuestions(questions.length, String((params as any).id));

    res.json({
        questions: questions[randomIndex],
        index: randomIndex
    });
});

questionsView.get('/:index',  async (req, res) => {
    const questions = await getQuestions();

    const index = Number(req.params.index);
    if(questions[index]){
        res.json({
            questions: questions[index],
            index,
        });
    } else {
        ApiError.badRequest("Invalid index!", res).resolve();
    }
});

export default questionsView;