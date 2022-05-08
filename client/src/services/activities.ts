import axios from "axios"
import { API_URL } from "./api"

interface AddProps{
    id: string
    logs: boolean[]
    time: number
    quizIndex: number
}


const Activities = {
    add(props: AddProps){
        return axios.post(`${API_URL}/activities`, props);
    }
}

export default Activities;