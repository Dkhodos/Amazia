import Main from "../../components/Main";
import QuestionImage from "./components/QuestionImage";
import Answers from "./components/Answers";
import React, { useMemo, useState } from 'react';
import {Steps} from "./components/Steps";
import { Box } from "@mui/material";
import getRandomQuestions from "../../utils/getRandomQuestions";

export default function Start() {
    const [step, setStep] = useState(1);

    const questions = useMemo(getRandomQuestions, []);

    function onRight() {
        setStep(step + 1);
    }

    console.log(questions);

    return (
        <Box>
            <Main title={"Image " + step}>
                <p><strong>Describe the emotion in the picture:</strong></p>
                <Steps step={step} />
                <QuestionImage src={questions[step].imageData}/>
                <Answers answer={questions[step].answer} options={questions[step].options} onRight={onRight}/>
            </Main>
        </Box>
    )
}