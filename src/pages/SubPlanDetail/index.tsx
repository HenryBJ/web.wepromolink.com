import { useEffect, useState } from "react";
import GenericDetail, { IField, IGenericDetailData } from "../../components/GenericDetail";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Loader from "../../components/Loader";
import { prepareData } from "./prepare";
import { getNotificationDetail } from "../../services";
import { changeToPlan, getSubscriptionDetail } from "../../services";
import { toast } from "react-toastify";
import { ISubscriptionPlanDetailResponse } from "../../interfaces/Responses";


const subIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
</svg>

export default function Index() {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [sub, setSub] = useState<ISubscriptionPlanDetailResponse | undefined>();
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        id && getSubscriptionDetail(id)
            .then(res => setSub(res.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const handleSubChange = (sub: any) => {
        let subId = sub.fields.find((e: any) => e.title === 'ID').value;
        
        // console.log(`Change to sub plan with ID=${subId}`);
        
        changeToPlan(subId)
            .then(res => {
                toast.success('Subcription plan changed successfully !!!');
                navigate('/subcriptions');
            })
            .catch(error => toast.error(error));
    }

    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <Breadcrumb levels={[{ icon: subIcon, title: 'Subcriptions', link: '/subcriptions' }, { title: 'Subscription\'s details', link: '' }]} />
            {sub && <GenericDetail prepare={prepareData(sub.value)} actions={!sub.value.inUse ? [{ title: 'Change to this plan', fn: (t) => handleSubChange(t) }] : []} />}
            {loading && <Loader text="Loading subcription details ..." />}
        </section>
    )

}