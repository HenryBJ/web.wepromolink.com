import { useEffect, useState } from "react";
import GenericDetail from "../../components/GenericDetail";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Loader from "../../components/Loader";
import { IMyAffLinkDetail } from "../../interfaces/ViewModels";
import { getCampaignDetail, getLinkAffDetail } from "../../services";
import { prepareData } from "./prepare";
import { IMyAffLinkDetailResponse } from "../../interfaces/Responses";


const linkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

export default function Index() {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [linkDetail, setLinkDetail] = useState<IMyAffLinkDetailResponse | undefined>();

    

    useEffect(() => {
        setLoading(true);
        id && getLinkAffDetail(id)
            .then(res => setLinkDetail(res.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);



    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <Breadcrumb levels={[{ icon: linkIcon, title: 'Links', link: '/links' }, { title: 'Link\'s details', link: '' }]} />
            {linkDetail && <GenericDetail prepare={prepareData(linkDetail.value)} />}
            {loading && <Loader text="Loading link details ..." />}
        </section>
    )

}