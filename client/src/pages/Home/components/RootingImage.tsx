import React from "react";
import styled from '@emotion/styled'
import RootingImageSrc from "../../../../public/images/home/rooting.gif"


export default function RootingImage(){
    return (
        <ImageWrapper>
            <Image src={RootingImageSrc} alt="rooting"/>
        </ImageWrapper>
    )
}

const Image = styled.img`
    max-width: 100%;
`

const ImageWrapper = styled.div`
    text-align-last: center;
    padding: 12px;
    min-width: 270px;
`;