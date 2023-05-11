import { useEffect, useState } from "react";
import GenericDetail, { IField, IGenericDetailData } from "../../components/GenericDetail";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Loader from "../../components/Loader";
import {  INotification } from "../../interfaces/ViewModels";
import { prepareData } from "./prepare";
import { getNotificationDetail } from "../../services";


const notiIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
</svg>

export default function Index() {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<INotification | undefined>();

    

    useEffect(() => {
        setLoading(true);
        id && getNotificationDetail(id)
            .then(res => setNotification(res.data.value))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);



    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <Breadcrumb levels={[{ icon: notiIcon, title: 'Notifications', link: '/notifications' }, { title: 'Notification\'s details', link: '' }]} />
            {notification && <GenericDetail prepare={prepareData(notification)} />}
            {loading && <Loader text="Loading notification details ..." />}
        </section>
    )

}