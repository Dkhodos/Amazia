import { useEffect, useMemo } from "react";
import { useAppSelector } from "../../../store";
import { selectQuestions } from "../../../store/reducers/root/root.selectors";

function preload(index: number, src: string){
    const imageID = `image_preloader_${index}_${Date.now()}`;

    const image = document.createElement("div");

    image.id = imageID;
    image.style.background = `url(${src}) no-repeat -9999px -9999px`

    document.head.appendChild(image);
}

export default function usePreloadImages(){
    const questions = useAppSelector(selectQuestions);

    const images = useMemo(() => {
        return questions.map(question => question.image);
    },[questions])

    useEffect(() => {
        images.forEach((value, index) => {
            preload(index + 1, value);
        });
    },[images])
}