import {Question} from "../@types/questions"
import QuestionJson from "../public/questions.json"

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function getRandomItem(arr: Question[][]): Question[]{
    const index = getRandomInt(arr.length - 1);

    return arr[index];
}

export default function getRandomQuestions(){
    const question = getRandomItem(QuestionJson as Question[][]);

    return question;
}