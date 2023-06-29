import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getImage, uploadImage } from "../../services";
import Spinner, { SpinnerType } from "../Spinner";
import { NO_IMAGEN_AVAILABLE } from "../../constant";

interface IProps {
    onImageLoaded: (url: string | null) => void,
    initialImageBundleId?: string | null
}

const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

const uploadIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="inline w-7 h-7">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
</svg>

const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="inline w-7 h-7">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>




export default function Index({ onImageLoaded, initialImageBundleId }: IProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [imgError, setImgError] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const fallbackImg: string = NO_IMAGEN_AVAILABLE;
    const [imageUrl, setImageURL] = useState<string>(fallbackImg);

    useEffect(() => {
        if (initialImageBundleId) {
            setLoading(true);
            getImage(initialImageBundleId)
                .then(res => setImageURL(res.data.compressed))
        }
    }, [initialImageBundleId])

    const controller = new AbortController();

    const cancelUpload = () => {
        controller.abort();
        setLoading(false);
    };

    const onImgError = () => {
        console.log('error');
        setImageURL(fallbackImg);
        setImgError(true);
        setLoading(false);
    };

    const onImgLoaded = () => {
        console.log('loaded');
        setLoading(false);
    };

    const handleUpdateImageURL = (imageBundleId: string) => {
        console.log(imageBundleId);
        getImage(imageBundleId)
            .then(res => {
                onImageLoaded(imageBundleId);
                setImageURL(res.data.compressed);
            });
    }

    const handleClearImage = () => {
        onImageLoaded(null);
        setImageURL(fallbackImg);
        if (inputFileRef.current) {
            inputFileRef.current.value = '';
        }
    }

    const validateImageDimensions = (file: any) => {
        return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const width = img.width;
                const height = img.height;
                const aspectRatio = parseFloat((width / height).toFixed(3));
                console.log(`width: ${width} height: ${height} aspect ratio: ${aspectRatio}`)
                if (width >= 1200 && height >= 630 && aspectRatio >= 1.2 && aspectRatio <= 2) {
                    resolve();
                } else {
                    reject({ width, height, ratio: aspectRatio });
                }
            };
            img.onerror = () => {
                reject({ width: 0, height: 0, ratio: 0 });
            };
        });
    };

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const signal = controller.signal;

        if (file && file.size <= 4 * 1024 * 1024) {
            validateImageDimensions(file)
                .then(() => {
                    const formData = new FormData();
                    formData.append('image', file);

                    setLoading(true);
                    uploadImage(formData, signal)
                        .then(res => handleUpdateImageURL(res.data))
                        .catch(_ => { toast.error('Error saving image'); setLoading(false) })
                })
                .catch(({ width, height, ratio }) => {
                    toast.error(`The image dimensions should be 1200x630 or bigger with an aspect ratio between 1.2 and 2, current is (${width}x${height},${ratio})`);
                });
        } else {
            toast.error('The image exceeds the allowed size limit (4 MB)')
        }
    };


    return (
        <>
            <div className="flex flex-col justify-center items-center px-0 w-full gap-2">
                <div className="flex justify-center items-center gap-4 w-full">
                    <label htmlFor="upload-input" className="cursor-pointer  text-black/40 hover:text-orange-700" >{uploadIcon}</label>
                    <input ref={inputFileRef} disabled={loading} id="upload-input" type="file" onChange={handleImageChange} accept=".jpeg, .jpg, .png" className="hidden" />
                    <button disabled={loading} onClick={handleClearImage} type="button" className="cursor-pointer  text-black/40 hover:text-orange-700" >{trashIcon}</button>
                </div>

                <div className="relative">
                    <img className="h-full w-80 rounded ring-2 ring-orange-500" onError={onImgError} onLoad={onImgLoaded} src={imageUrl} alt="Image preview" />
                    {loading &&
                        <div className="absolute rounded top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center">
                            <Spinner text="" type={SpinnerType.Primary} />
                        </div>}
                </div>

            </div>
        </>
    )
}