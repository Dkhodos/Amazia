import { Box } from "@mui/material";
import React, { useEffect, useMemo, useRef} from 'react';
import Main from "../../components/Main";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectLogs, selectQuestionsIndex, selectTime, selectVictory } from "../../store/reducers/root/root.selectors";
import {Button} from "@mui/material"
import { Navigate } from "react-router-dom";
import { resetChallenge } from "../../store/reducers/root";
import useSavedSession from "../Start/hooks/useSavedSession";
import Activities from "../../services/activities";
import { getLogin } from "../../hooks/useLogin";
import styled from "@emotion/styled";
import VictoryImageSRC from "../../../public/images/completed/victory.gif"
import getSession from "../../utils/getSession";

const Completed = () => {
    const dispatch = useAppDispatch();
    const reported = useRef(false);

    const logs = useAppSelector(selectLogs);
    const victory = useAppSelector(selectVictory);
    const quizIndex = useAppSelector(selectQuestionsIndex);
    const time = useAppSelector(selectTime);

    const correct = useMemo(() => {
        return logs.filter(log => log).length;
    },[])

    function onAgain(){
        dispatch(resetChallenge());
    }

    const {clearSession} = useSavedSession();
    useEffect(() => {
        const userID = getLogin().id;
        clearSession();

        if(reported.current){
            return;
        }

        if(victory && userID){
            // Activities.add({
            //     id: userID,
            //     logs,
            //     quizIndex,
            //     time: time,
            //     session: getSession()
            // }).then(() => {
            //     console.log(`%creported: id: ${userID} | score: ${correct}/${logs.length} | quizIndex: ${quizIndex} | time: ${time}s`, 'font-width:bold;');
            reported.current = true;
            // })
        }
    },[])

    if(!victory){
        return (<Navigate to={"/"}/>)
    }

    return (
        <Box>
            <Main title={"Well Done, You have completed the challenge!"}>
                <Container>
                    <VictorySentence>
                        <ScoreParagraph>You' have answered <strong>{correct}/{logs.length}</strong> questions correctly!</ScoreParagraph>
                        <AgainContainer>
                            <p>Would you like to play another round?</p>
                            <Button variant="contained" onClick={onAgain}>Yes Please!</Button>
                        </AgainContainer>
                    </VictorySentence>
                    <VictoryImage src={VictoryImageSRC}/>
                </Container>
            </Main>
        </Box>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;

    @media only screen and (max-width: 600px) {
        display: grid;
        justify-content: center;
        place-items: center;
        text-align: center;
    }
`;

const VictorySentence = styled.span``;

const ScoreParagraph = styled.p`
    margin: 0
`;

const AgainContainer = styled.div`
    margin: 80px 0 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media only screen and (max-width: 600px) {
        align-items: center;
        margin: 10px 0 10px 0;
    }
`;

const VictoryImage = styled.img`
    max-width: 200px;
`;

export default Completed;