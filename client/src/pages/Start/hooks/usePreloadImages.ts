import { useEffect, useMemo } from "react";
import { useAppSelector } from "../../../store";
import { selectQuestions } from "../../../store/reducers/root/root.selectors";

function preload(src: string){
    const img = new Image();

    if(import.meta.env.MODE === "production"){
        img.src = src;
    } else{
        img.src = "/public/" + src;
    }

    img.onload = () => console.log(`preload ${src}`);
}

export default function usePreloadImages(){
    const questions = useAppSelector(selectQuestions);

    const images = useMemo(() => {
        return questions.map(question => question.image);
    },[questions])

    useEffect(() => {
        if(images.length === 0){
            return;
        }

        console.log("Preloading images...");

        images.forEach((value) => {
            preload(value);
        });
    },[images])
}