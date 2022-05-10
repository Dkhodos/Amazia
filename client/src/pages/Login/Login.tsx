import {Button, FormControl} from "@mui/material"
import React, { useState } from "react"
import Main from "../../components/Main"
import { Navigate } from 'react-router-dom';
import useLoginState from "./hooks/useLoginState";
import {setLogin} from "../../hooks/useLogin";
import isIsraeliIDNumber from "../../utils/isIsraeliIDNumber";
import Users from "../../services/users"
import Loader from "../../components/Loader"
import styled from '@emotion/styled'
import Input from "./components/Input"
import BearImage from "./components/BearImage"

const ID_PATTERN = "[0-9]{9}"

export default function Login() {
    const [redirect, setRedirect] = useState(false);
    const {name, id, setUser, errors, setErrors} = useLoginState();
    const [isLoading, setLoading] = useState(false);

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
        setLoading(true);

        Users.set(name, id).then(() => {
            setRedirect(true);
            setLogin(name, id);
        }).catch((e) => {
            setErrors({id: e ? e.msg : "Something went wrong :("});
        }).finally(() => {
            setLoading(false);
        })
    }


    function onSubmit(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === "Enter"){
            onLogin();
        }
    }

    if(redirect){
        return <Navigate to='/'/>;
    }

    return (
        <LoginMain title={"Login"}>
            {isLoading ? <Loader/> : null}
            <Form variant="standard" onSubmit={onSubmit}>
                <View>
                    <InputsWrapper>
                        <Input label="Name / שם" value={name} onChange={e => setUser(e.target.value, id)} onKeyDown={onSubmit} required/>
                        <Input  label='Israeli ID / ת"ז' value={id} onChange={e => setUser(name, e.target.value)} required  inputProps={{pattern: ID_PATTERN}}
                                error={Boolean(errors.id)} helperText={errors.id} onKeyDown={onSubmit}/>
                    </InputsWrapper>

                    <Buttons>
                        <Button type={"submit"} variant="contained" onClick={onLogin} disabled={!(id && name)}>Login</Button>
                    </Buttons>

                    <Bottom>
                        <WelcomeMessage>Welcome!</WelcomeMessage>
                        <BearImage />
                    </Bottom>
                </View>
            </Form>
        </LoginMain>
    )
}

const View = styled.div`
    margin: 10px 20px;
`;

const InputsWrapper = styled.div`
    margin-top: 5px;
`;

const Buttons = styled.div`
    display: flex;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const WelcomeMessage = styled.p`
    font-weight: bold;
    text-align: left;
    font-size: 25px;
`;

const Form = styled(FormControl)`
    width: 100%;
`;

const LoginMain = styled(Main)`
    width: min(600px, 90vw);
`;