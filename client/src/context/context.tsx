import React, { ReactChild, ReactChildren, useContext, useState } from "react";
import { Question } from "../@types/questions";

export interface AppContextProps{
    questions: Question[]
    loading: {
        questions: boolean
    }
    setQuestions: (questions: Question[]) => void
}

type State = Omit<AppContextProps, "setQuestions">

const defaultState = {
    questions: [],
    loading: {
        questions: false
    },
}

const Context = React.createContext<AppContextProps>({
    ...defaultState,
    setQuestions: () => ({}),
});

export const useAppContext = () => useContext(Context);


export default function AppContext({children}:{children: any}){
    const [state, setState] = useState<State>(defaultState);

    function setQuestions(questions: Question[]){
        setState({
            ...state,
            questions
        })
    }

    return (
        <Context.Provider value={{...state, setQuestions}}>
            {children}
        </Context.Provider>
    )
}


