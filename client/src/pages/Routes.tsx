import {Route, Routes as BrowserRoutes} from "react-router-dom";
import Home from "./Home"
import Login from "./Login";
import Start from "./Start";
import React from 'react';
import useLogin from "../hooks/useLogin";

export default function Routes(){
    useLogin();

    return (
        <BrowserRoutes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/start" element={<Start/>}/>
            <Route path="/" element={<Home/>}/>
        </BrowserRoutes>
    )
}