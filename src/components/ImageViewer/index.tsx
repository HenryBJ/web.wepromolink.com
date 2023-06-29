import { BaseSyntheticEvent, useEffect, useState } from "react";
import { ImageBundle } from "../../interfaces/ViewModels";
import Spinner, { SpinnerType } from "../Spinner";
import { NO_IMAGEN_AVAILABLE } from "../../constant";

interface IProps {
    ImageBundle?: ImageBundle
    Scale: number
}

export default function ImageViewer({ ImageBundle, Scale }: IProps) {
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

    return (
        <div className="w-fit border border-orange-500 rounded relative">
            <img className={loading ? "filter blur-sm transition duration-500 rounded" : "rounded"}
                src={src}
                width={ImageBundle ? ImageBundle.compressedWidth / Scale : 300}
                height={ImageBundle ? ImageBundle.compressedHeight / Scale : 200}
                onLoad={handleLoad}
                alt="Image viewer" />
            {loading && <div className="absolute top-0 left-0 w-full h-full flex justify-center"><Spinner type={SpinnerType.Alternative} text="" /></div>}
        </div>)
}