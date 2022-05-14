import Main from "../../components/Main";
import QuestionImage from "./components/QuestionImage";
import Answers from "./components/Answers";
import React, { useEffect, useState } from 'react';
import {Steps} from "./components/Steps";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import {fetchQuestions} from "../../store/reducers/root/root.action";
import { selectLoaders, selectLogs, selectQuestions, selectQuestionsIndex, selectVictory } from "../../store/reducers/root/root.selectors";
import { setLogs, setTime, setVictory, updateLogs } from "../../store/reducers/root";
import useSavedSession from "./hooks/useSavedSession";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader";
import useTimer from "../../hooks/useTimer";
import styled from "@emotion/styled";
import { Question } from "../../@types/questions";

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

    function onStepClicked(stepClicked: number){
        setStep(stepClicked);
    }

    if(isLoading || questions.length === 0){
        return <Loader/>;
    }

    if(victory){
        return (<Navigate to={"/completed"}/>)
    }

    return (
        <StartBox>
            <StartMain title={"Which emotion represents the picture?"}>
                <Steps step={step + 1} logs={logs} onStepClicked={onStepClicked}/>
                <QuestionsWrapper step={step}>
                    {
                        questions.map((question, index) => (
                            <QuestionItem {...question} onAnswer={onAnswer} 
                                           inView={index === step} far={Math.abs(index - step) > 3}
                                           inactive={step !== index}/>)
                        )
                    }
                </QuestionsWrapper>
            </StartMain>
        </StartBox>
    )
}


const StartMain = styled(Main)`
    overflow: hidden;
`;

const StartBox = styled(Box)`
    overflow: hidden;
`;


interface QuestionsWrapperProps{
    step: number
};

const QuestionsWrapper = styled.div<QuestionsWrapperProps>`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    transition: transform .7s ease-in-out, opacity .7s ease-in-out;
    transform: translate(${(props) => -100 * props.step}%);
`

interface QuestionProps extends Question{
    onAnswer: (isRight: boolean) => void
    className?: string
    inView: boolean
    far: boolean
    inactive: boolean
}

const QuestionItem = styled(({answer,image,onAnswer,options, className}:QuestionProps) => (
    <div className={className}>
        <QuestionImage src={image}/>
        <Answers answer={answer} options={options} onAnswer={onAnswer} className={"amz-answers"}/>
    </div>
))<QuestionProps>`
    width: 100%;
    flex-shrink: 0;
    transition: opacity .3s ease-in-out;
    background: white;

    opacity: ${(props) => props.inView ? 1: 0};

    .amz-answers{
        pointer-events: ${(props) => props.inactive ? "none" : ""};
    }

    *{
        display:  ${(props) => props.far ? "none": ""};
    }
`;