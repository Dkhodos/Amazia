import { useEffect } from "react";
import { useAppContext } from "../../../context/context";
import useQuestions from "../../../hooks/useQuestions";

export default function fetchQuestions(){
    const {isLoading,questions} = useQuestions();
    const {setQuestions} = useAppContext();

    useEffect(() => {
        if(questions.length > 0){
            setQuestions(questions);
        }
    },[questions])

    return isLoading;
}