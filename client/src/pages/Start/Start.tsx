import Main from "../../components/Main";
import QuestionImage from "./components/QuestionImage";
import Answers from "./components/Answers";
import React, { useEffect, useState } from 'react';
import {Steps} from "./components/Steps";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import {fetchQuestions} from "../../store/reducers/root/root.action";
import { selectLoaders, selectLogs, selectQuestions, selectQuestionsIndex, selectVictory } from "../../store/reducers/root/root.selectors";
import usePreloadImages from "./hooks/usePreloadImages";
import { setLogs, setTime, setVictory, updateLogs } from "../../store/reducers/root";
import useSavedSession from "./hooks/useSavedSession";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader";
import useTimer from "../../hooks/useTimer";

export default function Start() {
    const dispatch = useAppDispatch();
    const {getSession, updateSession} = useSavedSession();

    const [step, setStep] = useState<number>(() => {
        const {step: sessionStep} = getSession();
        
        return sessionStep ?? 0;
    });

    const questions = useAppSelector(selectQuestions);
    const logs = useAppSelector(selectLogs);
    const quizIndex = useAppSelector(selectQuestionsIndex);
    const victory = useAppSelector(selectVictory);
    const {questions: isLoading} = useAppSelector(selectLoaders);
    const {start: startTimer, stop: stopTimer, time, set: setTimer} = useTimer();


    usePreloadImages();

    /* start timer */
    useEffect(() => {
        const {time} = getSession();

        setTimer(time ?? 0);
        startTimer();
    },[]);

    /* fetch questions from server*/
    useEffect(() => {
        const {quizIndex} = getSession();

        if(questions.length === 0){
            dispatch(fetchQuestions({
                quizIndex
            }));
        }
    },[]);

    /* save session logs */
    useEffect(() => {
        const {logs} = getSession();
        if(logs){
            dispatch(setLogs(logs));
        }
    },[]);


    function onAnswer(isRight: boolean) {
        dispatch(updateLogs({
            index: step,
            status: isRight
        }));

        dispatch(setTime(time));

        if(step + 1 !== questions.length){
            setStep(step + 1);
            updateSession({
                step:step+1,
                logs:[...logs, isRight],
                quizIndex,
                time
            });
        } else {
            updateSession({
                step,
                logs:[...logs, isRight],
                quizIndex,
                time
            });
            dispatch(setVictory(true));
        }
    }

    if(isLoading || questions.length === 0){
        return <Loader/>;
    }

    if(victory){
        return (<Navigate to={"/completed"}/>)
    }

    return (
        <Box>
            <Main title={"Describe the emotion in the picture"}>
                <Steps step={step + 1} logs={logs}/>
                <QuestionImage src={questions[step].image}/>
                <Answers answer={questions[step].answer} options={questions[step].options} onAnswer={onAnswer}/>
            </Main>
        </Box>
    )
}