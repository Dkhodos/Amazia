import React, {useEffect, useState} from "react";
import {Button, ButtonProps, Stack} from "@mui/material";
import styled from "@emotion/styled";

interface Props {
    answer: string
    options: string[]
    onAnswer: (isRight: boolean) => void
    className?: string
}

const getDefaultStatus = (options: string[]) => {
    return options.reduce((statuses: Record<string, Status>, value: string) => {
        statuses[value] = Status.None;

        return statuses;
    }, {} as Record<string, Status>);
}

const EnglishToHebrew: Record<string, string> = {
    "disgust" : "גועל",
    "happiness" : "שמחה",
    "sadness" : "עצב",
    "surprise" : "הפתעה",
    "anger" : "כעס",
    "fear": "פחד"
}

const Answers: React.FC<Props> = ({answer, options, onAnswer, className}) => {
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
        <Stack spacing={2} margin={"20px 30px"} padding={"5px 10px"} className={className}>
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

    let color = ""; 
    let backgroundColor =""; 

    if(status === Status.Right){
        color = "white";
        backgroundColor = "#31a431"
    }

    if(status === Status.Wrong){
        color = "white";
        backgroundColor = "#cf2727"
    }

    return <Item onClick={onClick} textColor={color} backgroundColor={backgroundColor}>
        {`${name} / ${EnglishToHebrew[name]}`}
    </Item>
}

interface ItemProps extends ButtonProps{
    textColor: string,
    backgroundColor: string
}

const ItemButton = (props: ButtonProps) => <Button {...props} variant="text"/>

const Item = styled(ItemButton)<ItemProps>`
    text-align: center;
    color: black;
    height: 40px;
    line-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    transition:  .2s background-color ease-in-out, transform .5s ease-in-out, opacity .5s ease-in-out !important;
    text-transform: capitalize;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

    color: ${(props) => props.textColor};
    background-color: ${(props) => props.backgroundColor} !important;
`

export default Answers;