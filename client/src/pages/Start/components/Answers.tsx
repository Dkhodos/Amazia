import React, {useEffect, useMemo, useState} from "react";
import shuffleArray from "../../../utils/shuffle";
import {Paper, Stack} from "@mui/material";
import styled from "@emotion/styled";
import clsx from "clsx";
import classes from "./commonStyle.module.css"

interface Props {
    answer: string
    options: string[]
    onAnswer: (isRight: boolean) => void
}

const getDefaultStatus = (options: string[]) => {
    return options.reduce((statuses: Record<string, Status>, value: string) => {
        statuses[value] = Status.None;

        return statuses;
    }, {} as Record<string, Status>);
}

const Item = styled(Paper)(({theme}) => ({}));

const Answers: React.FC<Props> = ({answer, options, onAnswer}) => {
    const [statuses, setStatuses] = useState<Record<string, Status>>({});

    function updateStatus(value: string, status: Status){
        setStatuses({
            ...statuses,
            [value]: status,
            [answer]: Status.Right,
        })
    }

    function onSelect(value: string) {
        setTimeout(() => {
            onAnswer(value === answer);
        }, 500);
    }

    useEffect(() => {
        setStatuses(getDefaultStatus(options));
    },[options]);


    if(Object.keys(statuses).length === 0){
        return null;
    }

    return (
        <Stack spacing={2} margin={"20px 30px"} padding={"5px 10px"}>
            {
                options.map(item => <Answer key={item} name={item} 
                                         onSelect={() => onSelect(item)} isAnswer={item === answer}
                                         status={statuses[item]} updateStatus={updateStatus}/>)
            }
        </Stack>
    )
}

enum Status {
    None,
    Right,
    Wrong
}

interface AnswerProps{
    name: string
    onSelect: VoidFunction,
    isAnswer: boolean
    status: Status
    updateStatus: (value: string, status: Status) => void
}

const Answer: React.FC<AnswerProps> = ({name, onSelect, isAnswer, status, updateStatus}) => {
    function onClick() {
        updateStatus(name, isAnswer ? Status.Right : Status.Wrong);
        onSelect();
    }

    return <Item onClick={onClick}
                 className={clsx(classes.answer, {[classes.rightAnswer]: status === Status.Right},
                     {[classes.wrongAnswer]: status === Status.Wrong})}>
        {name}
    </Item>
}

export default Answers;