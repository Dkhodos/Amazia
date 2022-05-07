import Main from "../../components/Main";
import QuestionImage from "./components/QuestionImage";
import Answers from "./components/Answers";
import React, { useEffect, useState } from 'react';
import {Steps} from "./components/Steps";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import {fetchQuestions} from "../../store/reducers/root/root.action";
import { selectLoaders, selectQuestions } from "../../store/reducers/root/root.selectors";
import usePreloadImages from "./hooks/usePreloadImages";
import { updateLogs } from "../../store/reducers/root";
import useSavedSession from "./hooks/useSavedSession";

export default function Start() {
    const dispatch = useAppDispatch();
    const {clear, getSession, updateSession} = useSavedSession();

    const [step, setStep] = useState<number>(0);

    const questions = useAppSelector(selectQuestions);
    const {questions: isLoading} = useAppSelector(selectLoaders);


    usePreloadImages();

    useEffect(() => {
        if(questions.length === 0){
            dispatch(fetchQuestions());
        }
    },[])


    function onAnswer(isRight: boolean) {
        if(step !== questions.length){
            setStep(step + 1);
        }

        dispatch(updateLogs({
            index: step,
            status: isRight
        }));
    }

    if(isLoading || questions.length === 0){
        return null;
    }

    return (
        <Box>
            <Main title={"Image " + step}>
                <p><strong>Describe the emotion in the picture:</strong></p>
                <Steps step={step + 1} />
                <QuestionImage src={questions[step].image}/>
                <Answers answer={questions[step].answer} options={questions[step].options} onAnswer={onAnswer}/>
            </Main>
        </Box>
    )
}