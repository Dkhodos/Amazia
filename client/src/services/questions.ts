import axios from "axios";
import { Question } from "../@types/questions";
import { getLogin } from "../hooks/useLogin";
import { API_URL } from "./api";

interface QuestionsResponse{
    index: number,
    questions: Question[]
}

const Questions = {
    get(index?: number){
        if(!index){
            return axios.get<QuestionsResponse>(`${API_URL}/questions`,{
                params: {
                    id: getLogin().id,
                }
            })
        }

        return axios.get<QuestionsResponse>(`${API_URL}/questions/${index}`);

    }
}

export default Questions;