import classes from "./styles.module.css"
import BearImage from "../../../public/images/login/bear.png"
import {Button, FormControl} from "@mui/material"
import TextInput from "../../components/TextInput"
import useDelay from "../../hooks/useDelay"
import clsx from 'clsx'
import React, { useState } from "react"
import Main from "../../components/Main"
import { Navigate } from 'react-router-dom';
import useLoginState from "./hooks/useLoginState";
import {getLogin, setLogin} from "../../hooks/useLogin";
import isIsraeliIDNumber from "../../utils/isIsraeliIDNumber";
import Users from "../../services/users"

const styles = {
    root : classes.modal
}

const ID_PATTERN = "[0-9]{9}"

export default function Login() {
    const welcome = useDelay(200);
    const [redirect, setRedirect] = useState(false);
    const {name, id, setUser, errors, setErrors} = useLoginState();

    function onLogin(){
        if(!id.match(ID_PATTERN)){
            setErrors({
                id: `Israeli ID to short or long / שגיאה ת"ז קצרה או ארוכה מידי`
            });
            return;
        }

        if(!isIsraeliIDNumber(id)){
            setErrors({
                id: `invalid israeli ID / ת"ז שגויה`
            });
            return;
        }

        setErrors({name: "", id: ""});

        Users.set(name, id).then(() => {
            setRedirect(true);
            setLogin(name, id);
        }).catch((e) => {
            setErrors({id: e ? e.msg : "Something went wrong :("});
        })

    }

    if(redirect){
        return <Navigate to='/'/>;
    }

    return (
        <Main title={"Login"} classes={styles}>
            <FormControl variant="standard">
                <div className={classes.view}>
                    <div className={classes.inputs}>
                        <span className={classes.input}>
                            <TextInput label="Name / שם" value={name} onChange={e => setUser(e.target.value, id)} required/>
                        </span>
                        <span className={classes.input}>
                            <TextInput label='Israeli ID / ת"ז' value={id} onChange={e => setUser(name, e.target.value)} required  inputProps={{pattern: ID_PATTERN}}
                                       error={Boolean(errors.id)} helperText={errors.id}/>
                        </span>
                    </div>

                    <div className={classes.buttons}>
                        <Button type={"submit"} variant="contained" onClick={onLogin} disabled={!(id && name)}>Login</Button>
                    </div>

                    <div className={classes.bottom}>
                        <p>
                            We connect people who make community for
                            a better world
                            of changes
                        </p>
                        <img src={BearImage} alt={'login bear'} className={clsx(classes.bear, {[classes.welcome]: welcome})}/>
                    </div>
                </div>
            </FormControl>
        </Main>


    )
}