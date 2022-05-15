import React, {useEffect, useState} from "react";
import styled from '@emotion/styled'
import Main from "../../components/Main";
import {Box, Button} from "@mui/material";
import {Navigate} from "react-router-dom";
import useSavedSession from "../Start/hooks/useSavedSession";

const Description = styled.div`
padding: 12px;
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
        <Main title={"Welcome!"}>
            <Description>
                <p>
                   The following quiz includes 10 question in which you need to recognize which
                    emotion is primarily shown by the actor.
                </p>
                <p>
                    Please do your best to recognize as many emotions correctly as you can,
                    good luck!!!
                </p>
                <Button type={"submit"} variant="contained" onClick={onStart}>Start!</Button>
            </Description>
        </Main>
    )
}