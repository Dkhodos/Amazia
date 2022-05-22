import axios from "axios"
import { API_URL } from "./api"

const Users = {
    set(name: string, id: string){
        return axios.post(`${API_URL}/users`, {
            id, name
        })
    }
}

export default Users