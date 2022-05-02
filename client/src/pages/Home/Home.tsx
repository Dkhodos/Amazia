import React, {useState} from "react";
import Main from "../../components/Main";
import {Box, Button} from "@mui/material";
import {Navigate} from "react-router-dom";

export default function Home() {
    const [start, setStart] = useState(false);

    function onStart() {
        setStart(true);
    }

    if(start){
        return <Navigate to={'/start'}/>
    }

    return (
        <Main title={"Welcome!"}>
            <strong>Read the following instruction...</strong>
            <Box>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam.
                </p>
                <ul>
                    <ol> 1. Lorem ipsum dolor sit amet 1</ol>
                    <ol> 2. Lorem ipsum dolor sit amet 2</ol>
                    <ol> 3. Lorem ipsum dolor sit amet 3</ol>
                </ul>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam.
                </p>
                <Button type={"submit"} variant="contained" onClick={onStart}>Start!</Button>
            </Box>
        </Main>
    )
}