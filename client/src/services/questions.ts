import axios from "axios";
import { Question } from "../@types/questions";
import { API_URL } from "./api";


const Questions = {
    get(){
        return axios.get<Question[]>(`${API_URL}/questions`)
    }
}

export default Questions;