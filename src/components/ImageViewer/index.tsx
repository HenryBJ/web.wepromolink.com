import { BaseSyntheticEvent, useEffect, useState } from "react";
import { ImageBundle } from "../../interfaces/ViewModels";
import Spinner, { SpinnerType } from "../Spinner";
import { NO_IMAGEN_AVAILABLE } from "../../constant";

interface IProps {
    ImageBundle?: ImageBundle
    Scale: number,
    FixWidth?: number,
    FixHeight?: number,
    FallbackWidth?: number,
    FallbackHeight?: number;
}

export default function ImageViewer({ ImageBundle, Scale, FixWidth, FixHeight, FallbackWidth = 300, FallbackHeight = 200 }: IProps) {
    const [loading, setLoading] = useState(true);
    const [src, setSrc] = useState<string>();

    useEffect(() => {
        setSrc(ImageBundle?.thumbnail ?? NO_IMAGEN_AVAILABLE);
    }, [])

    const handleLoad = (e: BaseSyntheticEvent) => {
        if (e.target.src === ImageBundle?.thumbnail) {
            setSrc(ImageBundle?.compressed);
        } else {
            setLoading(false);
        }
    }

    const getWidth = () => {
        if (FixWidth) return FixWidth;
        if (FixHeight && ImageBundle) {
            return ImageBundle?.originalAspectRatio * FixHeight;
        }
        return ImageBundle ? ImageBundle.compressedWidth / Scale : FallbackWidth;
    }

    const getHeight = () => {
        if (FixHeight) return FixHeight;
        if(FixWidth && ImageBundle){
            return FixWidth / ImageBundle?.originalAspectRatio;
        }
        return ImageBundle ? ImageBundle.compressedHeight / Scale : FallbackHeight
    }

    return (
        <div className="w-fit border rounded-2xl relative mx-1">
            <img className={loading ? "filter blur-sm transition duration-500 rounded-2xl" : "rounded-2xl"}
                src={src}
                width={getWidth()}
                height={getHeight()}
                onLoad={handleLoad}
                alt="Image viewer" />
            {loading && <div className="absolute top-0 left-0 w-full h-full flex justify-center"><Spinner type={SpinnerType.Alternative} text="" /></div>}
        </div>)
}