import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const username_key = "amazia-user-name";
const id_key = "amazia-user-id";

export function getLogin(){
    return {
        name: localStorage.getItem(username_key),
        id: localStorage.getItem(id_key),
    }
}

export function setLogin(name: string, id: string){
    localStorage.setItem(username_key, name);
    localStorage.setItem(id_key, id);
}

export default function useLogin(){
    const navigate = useNavigate();

    useEffect(() => {
        const {id, name} = getLogin();
        if(!id || !name){
            navigate("/login", {replace: true});
        }
    },[])
}