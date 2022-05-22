import React, {useEffect, useState} from "react";
import styled from '@emotion/styled'
import Main from "../../components/Main";
import {Box, Button} from "@mui/material";
import {Navigate} from "react-router-dom";
import useSavedSession from "../Start/hooks/useSavedSession";
import RootingImage from "./components/RootingImage";

const Description = styled.div`
    padding: 12px;
    width: 50%;

    h4, p{
        margin: 10px 0;
    }

    &.hebrew{
        text-align: right;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DescriptionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: top;
`;

const Separator = styled.div`
    width: 1px;
    background: #eee;
    height: 100%;
`;

export default function Home() {
    const [start, setStart] = useState(false);
    const {clearSession} = useSavedSession();


    function onStart() {
        setStart(true);
    }

    useEffect(() => {
        clearSession();
    },[]);

    if(start){
        return <Navigate to={'/start'}/>
    }


    return (
        <Main title={"Welcome! / !ברוכים הבאים"}>
            <DescriptionWrapper>
                    <Description>
                        <h4>Instructions</h4>
                        <p>
                            The following quiz includes 10 question in which you need to recognize which
                            emotion is primarily shown by the actor.
                        </p>
                        <p>
                            Please do your best to recognize as many emotions correctly as you can,
                            good luck!!!
                        </p>
                    </Description>
                    <Separator/>
                    <Description className="hebrew">
                        <h4>הוראות</h4>
                        <p >
                        .השאלון הבא כולל 10 שאלות בהן תידרש לבחור את הרגש העיקרי הנראה בתמונה
                        </p>
                        <p>
                            בבקשה עשה את מיטב יכולתך על מנת לענות על השאלות באופן נכון, בהצלחה!
                        </p>
                    </Description>
                </DescriptionWrapper>
                <ButtonWrapper>
                    <Button type={"submit"} variant="contained" onClick={onStart}>Start! / !התחל</Button>
                </ButtonWrapper>
            <RootingImage/>
        </Main>
    )
}