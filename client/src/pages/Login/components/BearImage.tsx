import styled from "@emotion/styled";
import React from "react";
import useDelay from "../../../hooks/useDelay";
import BearImageSrc from "../../../../public/images/login/bear.png"

const BearImage = ({delay = 200}:{delay?: number}) => {
    const welcome = useDelay(delay);

    return <Image src={BearImageSrc} alt={'login bear'} welcome={Boolean(welcome)}/>
}

export default BearImage;

interface ImageProps  {
    welcome: boolean
}

const Image = styled.img<ImageProps>`
    height: 150px;
    position: relative;
    bottom: -20px;
    transform: ${(props) => props.welcome ? "" : "scaleX(-1)"};
    transition: .3s all ease-in-out;
`