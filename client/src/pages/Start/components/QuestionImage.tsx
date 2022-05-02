import image from "../../../public/images/faces/smiling_1.png"
import classes from "./commonStyle.module.css"
import React from "react"

interface Props{
    src: string
}

export default function QuestionImage({src}:Props){
    return (
        <div className={classes.image}>
            <img src={`/src/public/faces/${src}`} alt={"question image"}/>
        </div>
    )
}