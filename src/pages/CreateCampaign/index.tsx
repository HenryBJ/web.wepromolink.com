import GenericForm, { FormItem } from "../../components/GenericForm";
import * as yup from "yup";
import { ChangeEvent, ReactEventHandler, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { CreateCampaigns } from "../../services/CampaignService";
import { useNavigate } from "react-router-dom";
import { ICreateCampaign } from "../../interfaces/ViewModels";
import { useAuth } from "../../hooks/Auth";
import Breadcrumb from "../../components/Breadcrumb";


const schema = yup.object({
    title: yup.string().trim().required(),
    description: yup.string().required(),
    url: yup.string().url().required(),
    imageUrl: yup.string().url().required(),
    epm: yup.number().required()
        .min(10, "CPM must be greater than 10")
        .max(1000, "CPM must be lower than 1000")
}).required();


const campIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
</svg>

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
            <Breadcrumb levels={[{ icon: campIcon, title: 'Campaigns', link: '/campaigns' }, { title: 'Create Campaign', link: '' }]} />
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