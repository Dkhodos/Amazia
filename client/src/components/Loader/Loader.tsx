import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import React from 'react';

const Loader = () => (
    <ProgressShadow>
        <Progress/>
    </ProgressShadow>
)

const Progress = styled(CircularProgress)`
    width: 80px !important;
    height: 80px !important;
`;

const ProgressShadow = styled.div`
    position: fixed;
    display: flex;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000000c9;
    z-index: 10000;
    justify-content: center;
    align-items: center;
`

export default Loader;