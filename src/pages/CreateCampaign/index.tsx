import GenericForm, { FormItem } from "../../components/GenericForm";
import * as yup from "yup";
import { ChangeEvent, ReactEventHandler, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { CreateCampaigns } from "../../services/CampaignService";
import { useNavigate } from "react-router-dom";
import { ICreateCampaign } from "../../interfaces/ViewModels";
import { useAuth } from "../../hooks/Auth";


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
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();
    const { user } = useAuth();


    const onImgError = () => {
        console.log('error');
        if (!imgError) {
            setImgSrc(fallbackImg);
            setImgError(true);
        }
    };

    const checkImg = async (imageUrl: string) => {
        const imagen = new Image();
        imagen.src = imageUrl;

        imagen.onload = () => {
            setImgSrc(imageUrl);
        };

        imagen.onerror = () => {
            setImgSrc(fallbackImg);
        };
    }

    const handleImg = (e: string) => {

        function validarURL(url: string) {
            const regex = /^(http|https):\/\/[^ "]+$/;
            return regex.test(url);
        }

        if (validarURL(e)) {
            checkImg(e);
        }
    }

    const onSubmit = (data: ICreateCampaign) => {
        setLoading(true);
        
        data.imageUrl = imgSrc;
        data.email = user.email

        CreateCampaigns(data)
            .then(res => navigation(-1))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));

    }


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
                        handleImg(obj.imageUrl);
                        return (
                            <div className="flex justify-start items-center px-0">
                                <img className="h-full w-80 rounded ring-2 ring-orange-500" onError={onImgError} src={imgSrc} alt="Image preview" />
                            </div>
                        )
                    }}
                </FormItem>
            </GenericForm>
            {loading && <Loader text="Creating campaign ..." />}
        </section>)
}