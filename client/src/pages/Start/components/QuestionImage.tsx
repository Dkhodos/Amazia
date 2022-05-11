import React from "react"
import styled from "@emotion/styled";

interface Props{
    src: string
}

export default function QuestionImage({src}:Props){
    function getSrc(){
        if(import.meta.env.MODE === "production"){
            return src;
        }
        return "/public/" + src;
    }

    return (
        <Image>
            <img src={getSrc()} alt={"question image"}/>
        </Image>
    )
}

const Image = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 20px;

    max-height: 400px;
    max-width: 100%;
    min-width: 60px;
    min-height: 60px;

    img {
        width:  100%;
        height: 100%;
    }
`