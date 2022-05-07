import axios from "axios";
import { Question } from "../@types/questions";
import { getLogin } from "../hooks/useLogin";
import { API_URL } from "./api";


const Questions = {
    get(){
        return axios.get<Question[]>(`${API_URL}/questions`,{
            params: {
                id: getLogin().id,
            }
        })
    }
}

export default Questions;