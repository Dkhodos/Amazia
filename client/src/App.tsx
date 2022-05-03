import './App.css'
import Routes from "./pages/Routes"
import React from 'react';
import useLogin from "./hooks/useLogin";
import AppContext from './context/context';

function App() {
    useLogin();

    return (
        <div className="App">
            <AppContext>
                <Routes/>
            </AppContext>
        </div>
    )
}

export default App
