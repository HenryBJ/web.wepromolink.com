import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import DynamicTable from "../../components/DynamicTable";
import { INotificationResponse } from "../../interfaces/Responses";
import { getNotifications } from "../../services";
import { Columns } from "./columns";
import { useNavigate } from "react-router-dom";

export default function Index() {

    const notiIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  inline mr-2 my-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<INotificationResponse>();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getNotifications(page)
            .then((res) => setData(res.data))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
    }, [page]);


    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
            <Breadcrumb levels={[{ icon: notiIcon, title: 'Notifications', link: '/notifications' }, { title: 'Notifications', link: '' }]} />
            <DynamicTable title='Notifications' defaultAction={(e: any) => navigate(`/notifications/detail/${e.id}`)} columns={Columns} loading={loading}
                pagination={
                    {
                        first: () => setPage(1),
                        last: () => setPage(data?.value.pagination.lastPage.valueOf() || 1),
                        next: () => setPage(prev => prev + 1),
                        prev: () => setPage(prev => prev - 1),
                        ...(data?.value.pagination!),
                    }
                }
                rows={data?.value.items || []} />
        </section>)
}