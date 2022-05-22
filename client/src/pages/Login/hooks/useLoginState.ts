import { useState } from "react";
import {getLogin} from "../../../hooks/useLogin";

interface Errors{
    id: string,
    name: string,
}

export default function useLoginState(){
    const {id: lsId, name: lsName} = getLogin();

    const [name, setName] = useState(lsName ?? "");
    const [id, setId] = useState(lsId ?? "");
    const [errors, setErrors] = useState<Errors>({
        id: "",
        name: ""
    })


    function setUser(name: string, id: string){
        setName(name);
        setId(id);
    }

    function onErrorChange(newErrors: Partial<Errors>){
        setErrors({
            ...errors,
            ...newErrors,
        })
    }

    return {
        name, id, setUser, errors, setErrors: onErrorChange
    }
}