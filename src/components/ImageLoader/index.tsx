import { useState } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "../../services";
import Spinner from "../Spinner";

interface IProps {
    cssClass?: string,
    onImageLoad: (url: string) => void,
}

const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

const uploadIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="inline w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
</svg>



export default function Index({ cssClass, onImageLoad }: IProps) {
    const cssButtonStyle = "min-w-[155px] focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 md:px-7 py-1";
    const [stage, setStage] = useState<boolean | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const controller = new AbortController();

    const cancelUpload = () => {
        controller.abort();
        setLoading(false);
    };

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const signal = controller.signal;

        if (file && file.size <= 4 * 1024 * 1024) {
            const formData = new FormData();
            formData.append('image', file);

            setLoading(true);
            uploadImage(formData, signal)
                .then(res => onImageLoad(res.data))
                .catch(_ => toast.error('Error saving image'))
                .finally(() => setLoading(false))

        } else {
            toast.error('The image exceeds the allowed size limit (4 MB)')
        }
    };


    return (
        <>
            {loading ? <div className="w-full">
                <Spinner text="Uploading image" textStyle="text-orange-600" />
                <button onClick={cancelUpload} type="button" className={cssButtonStyle}>Cancel</button>
            </div>
                : stage === null && !loading ?
                    <div className="flex justify-center items-center gap-2 md:gap-6 flex-grow">
                        <button onClick={() => setStage(false)} type="button" className={cssButtonStyle}>Image Url</button>
                        or
                        <label htmlFor="upload-input" style={{ cursor: 'pointer', textAlign: 'center' }} className={cssButtonStyle}>Upload Image</label>
                        <input id="upload-input" type="file" onChange={handleImageChange} accept=".jpeg, .jpg, .png, .svg" className="hidden" />
                    </div>
                    :
                    stage ?
                        <div className="w-full flex gap-2">

                        </div>
                        :
                        <div className="w-full flex gap-2">
                            <input
                                className={cssClass}
                                maxLength={150}
                                placeholder="Image URL"
                                type="text"
                                onChange={(e) => onImageLoad(e.target.value)} />
                            <button className="hover:text-orange-500" onClick={() => setStage(null)}>{closeIcon}</button>
                        </div>
            }
        </>
    )
}