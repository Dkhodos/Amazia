import styled from "@emotion/styled";
import React from "react";
import useDelay from "../../../hooks/useDelay";
import BearImageSrc from "../../../../public/images/login/bear.png"
import AmaziaImageSrc from "../../../../public/fav.ico"

const BearImage = ({delay = 200}:{delay?: number}) => {
    const welcome = useDelay(delay);

    return (<Images>
            <AmzaiaImage src={AmaziaImageSrc} alt={'icon'} welcome={Boolean(welcome)}/>
            <BearImage1 src={BearImageSrc} alt={'login bear'} welcome={Boolean(welcome)}/>
        </Images>)
}

export default BearImage;

interface ImageProps  {
    welcome: boolean
}

const Images = styled.div`
    position: relative;
`;

const BearImage1 = styled.img<ImageProps>`
    height: 150px;
    position: relative;
    bottom: -20px;
    transform: ${(props) => props.welcome ? "" : "scaleX(-1)"};
    transition: .3s all ease-in-out;
`

const AmzaiaImage = styled.img<ImageProps>`
    height: 48px;
    width: 48px;
    position: absolute;
    opacity: ${(props) => props.welcome ? 1 : 0};
    transition: .3s all ease-in-out;
`