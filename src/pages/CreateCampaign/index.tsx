import GenericForm, { FormItem } from "../../components/GenericForm";
import * as yup from "yup";
import { ReactEventHandler, useEffect, useState } from "react";

type CampaignInputs = {
    title: string,
    url: string,
    description: string,
    imageUrl: string,
    epm: number,
    email: string
}

const schema = yup.object({
    title: yup.string().trim().required(),
    description: yup.string().required(),
    url: yup.string().url().required(),
    imageUrl: yup.string().url().required(),
    epm: yup.number().required()
        .min(10, "CPM must be greater than 10")
        .max(1000, "CPM must be lower than 1000")
}).required();


export default function Index() {
    const fallbackImg: string = "https://wepromolink.com/card.png";
    const [imgSrc, setImgSrc] = useState(fallbackImg);
    const [imgError, setImgError] = useState(false);


    const onImgError = () => {
        console.log('error');
        if (!imgError) {
            setImgSrc(fallbackImg);
            setImgError(true);
        }
    };

    // const handleImg = (imageUrl: string):string => {
    //     try {

    //         const fn = async (url:string)=> await fetch(url); 

    //         const response = await fn(imageUrl) 
    //         const contentType = response.headers.get('content-type');
    //         if(contentType && (contentType.includes('image/png') || contentType.includes('image/jpeg')) ){
    //             return imageUrl;
    //         } else {
    //             return fallbackImg;
    //         }
            
    //     } catch (error) {
    //         return fallbackImg;
    //     }
    // }

    const onSubmit = (data: CampaignInputs) => {
        alert(data.description);
    }

    useEffect(()=>{

    },[]);



    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <GenericForm schema={schema} title="Create Campaign" onSubmit={onSubmit} buttonTitle="Create" >
                <FormItem field="title" helpTip="Campaign's Title">
                    {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={60} placeholder="Title" type="text" {...register("title")} />)}
                </FormItem>

                <FormItem field="description" helpTip="Campaign description">
                    {({ register }) => (<textarea className="h-28 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none" maxLength={500} placeholder="Description" {...register("description")} />)}
                </FormItem>

                <FormItem field="url" helpTip="Campaign URL">
                    {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="URL" type="text" {...register("url")} />)}
                </FormItem>

                <FormItem helpTip="CPM: Cost per mile, This is the cost for 1000 clicks range (10-1000)">
                    {({ register }) => (<input max={1000} min={10} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={60} placeholder="Cost per mile (CPM)" type="number" {...register("epm")} />)}
                </FormItem>

                <FormItem field="imageUrl" helpTip="Campaign Image URL">
                    {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Image URL" type="text" {...register("imageUrl")} />)}
                </FormItem>

                <FormItem helpTip="Campaign Image Preview: if the image url provided is not valid a default image is used">
                    {({ watch }) => {
                        let obj: any = watch();
                        // handleImg(obj.imageUrl);
                        return (
                            <div className="flex justify-start items-center px-0">
                                <img className="h-full w-80 rounded ring-2 ring-orange-500" onError={onImgError} src={imgSrc} alt="Image preview" />  
                            </div>
                        )
                    }}
                </FormItem>
            </GenericForm>
        </section>)
}