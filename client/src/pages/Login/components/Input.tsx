import styled from "@emotion/styled";
import { TextFieldProps } from "@mui/material";
import React from "react";
import TextInput from "../../../components/TextInput";

const Input = (props: TextFieldProps) => (
    <InputWrapper>
        <TextInput {...props}/>
    </InputWrapper>
)



const InputWrapper = styled.span`
    display: flex;
    margin: 20px 0;
    width: 100%;
`

export default Input;