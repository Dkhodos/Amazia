import classes from "./commonStyle.module.css"
import React from "react"

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
        <div className={classes.image}>
            <img src={getSrc()} alt={"question image"}/>
        </div>
    )
}