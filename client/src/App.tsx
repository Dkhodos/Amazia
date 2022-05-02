import './App.css'
import Routes from "./pages/Routes"
import React from 'react';
import useLogin from "./hooks/useLogin";

function App() {
    useLogin();

    return (
        <div className="App">
            <Routes/>
        </div>
    )
}

export default App
