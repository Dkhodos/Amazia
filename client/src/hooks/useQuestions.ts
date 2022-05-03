import { useEffect, useState } from "react";
import { Question } from "../@types/questions";
import Questions from "../services/questions";

export default function useQuestions(){
    const [state, setState] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        Questions.get().then(r => r.data).then(r => {
            setState(r);
            setLoading(false);
        }).catch(e => {
            console.error(e);
            setLoading(false);
        });
    },[]);

    
    return {
        questions: state,
        isLoading: loading
    }
}