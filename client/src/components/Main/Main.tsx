import {Paper} from "@mui/material"
import clsx from "clsx"
import React from "react"
import styles from "./styles.module.css"

interface Props {
    title: string
    classes?: {
        root?: string
        header?: string
        content?: string
    }
}

const Main: React.FC<Props> = ({children, classes, title}) => {
    return (
        <Paper elevation={3} classes={{root: clsx(styles.main, classes?.root)}}>
            <header className={clsx(styles.header, classes?.header)}>{title}</header>
            <div className={classes?.content}>
                {children}
            </div>
        </Paper>
    )
}

export default Main;