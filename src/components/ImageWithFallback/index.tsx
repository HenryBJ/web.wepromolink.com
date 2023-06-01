import { useState } from "react";

interface IProps {
    src: string,
    alt: string,
    style?: string
}

export default function ImageWithFallback({ src, alt, style }: IProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const fallbackSrc: string = "https://wepromolink.com/card.png";

    const handleFallback = () => {
        setImgSrc(fallbackSrc);
    };

    return <img src={imgSrc} onError={handleFallback} alt={alt} className={style ? style : ''} />;
}
