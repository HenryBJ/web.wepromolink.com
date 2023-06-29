import GenericForm, { FormItem } from "../../components/GenericForm";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { editCampaign, getCampaignDetail } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { ICreateCampaign, IMyCampaignDetail } from "../../interfaces/ViewModels";
import { useAuth } from "../../hooks/Auth";
import Breadcrumb from "../../components/Breadcrumb";
import { toast } from "react-toastify";
import { getAvailableBalanceData } from "../../services";
import ImageLoader from "../../components/ImageLoader";
import useVisit from "../../hooks/Visit";
import { gTag } from "../../firebase";


const schema = yup.object({
    title: yup.string().trim().required(),
    description: yup.string().required(),
    url: yup.string().url().required(),
    imageBundleId: yup.string().nullable(),
    epm: yup.number().required()
        .min(10, "CPM must be greater than 10")
        .max(1000, "CPM must be lower than 1000")
}).required();


const campIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
</svg>

export default function Index() {
    const [loading, setLoading] = useState(false);
    const [available, setAvailable] = useState(0);
    const [initialBudget, setInitialBudget] = useState<number>(0);
    const [campaign, setCampaign] = useState<IMyCampaignDetail | undefined>();
    const navigation = useNavigate();
    const { user } = useAuth();
    const { id } = useParams();
    let max: number = Math.floor(available + (campaign?.budget?.valueOf() ?? 0));


    useEffect(() => {
        getAvailableBalanceData()
            .then(res => setAvailable(res.data.valueOf()))
            .catch(error => toast.error("Unable to get available amount"))
    }, []);

    useVisit('visit_campaign_edit');

    useEffect(() => {
        setLoading(true);
        id && getCampaignDetail(id)
            .then(res => {
                setCampaign(res.data)
                setInitialBudget(res.data.budget.valueOf())
            })
            .catch(error => toast.error(error))
            .finally(() => setLoading(false));
    }, []);

    const onSubmit = (data: ICreateCampaign) => {
        setLoading(true);

        data.email = user.email

        id && editCampaign(id, data)
            .then(res => {
                toast.success('Campaign edited successfully !!!');
                gTag('campaign_edited', { campaignid: id })
                navigation(-1);
            })
            .catch(error => toast.error(error.response?.data))
            .finally(() => setLoading(false));
    }

    const onChangeBudget = (e: any, register: any) => {
        console.log(e.target.value);
        if (e.target.value >= 0 && e.target.value <= max) {
            register("budget").onChange(e);
        } else {
            e.preventDefault();
        }
    };

    const handleBudgetKeyPress = (e: any) => {
        const currentValue = e.target.value;
        const keyCode = e.keyCode || e.which;
        const newValue = parseInt(currentValue + String.fromCharCode(keyCode));

        if (isNaN(newValue) || newValue < 0 || newValue > max) {
            e.preventDefault();
        }
    };


    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <Breadcrumb levels={[{ icon: campIcon, title: 'Campaigns', link: '/campaigns' }, { title: 'Edit Campaign', link: '' }]} />
            <GenericForm schema={schema} title="Edit Campaign" onSubmit={onSubmit} buttonTitle="Edit" initialValue={campaign} >
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

                <FormItem field="budget" helpTip="Budget: Amount of money assigned to the campaign">
                    {({ register, watch }) => {
                        let obj: any = watch();
                        return <div className="flex flex-row gap-2 md:gap-4 flex-grow">
                            <input max={max} min={0}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Budget"
                                type="number"
                                onKeyDown={handleBudgetKeyPress}
                                onPaste={(e) => e.preventDefault()}
                                onChange={(e) => onChangeBudget(e, register)}
                                onBlur={register("budget").onBlur}
                                name={register("budget").name}
                                ref={register("budget").ref} />

                            <div className="flex flex-col justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <span className="text-gray-700 font-semibold">{`Available: $${(available - obj.budget + (campaign?.budget?.valueOf() ?? 0)).toFixed(2)}`}</span>
                            </div>
                        </div>
                    }}
                </FormItem>

                <FormItem field="imageBundleId">
                    {({ setValue }) => <ImageLoader initialImageBundleId={campaign?.imageBundle?.externalId} onImageLoaded={e => setValue("imageBundleId", e)} />}
                </FormItem>

            </GenericForm>
            {loading && <Loader text="Loading..." />}
        </section>)
}