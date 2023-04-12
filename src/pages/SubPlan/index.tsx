
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb"
import DynamicTable from "../../components/DynamicTable";
import { ISubscriptionResponse } from "../../interfaces/Responses";
import { GetSubscriptionPlans } from "../../services/SubscriptionService";
import { Columns } from "./columns";
import { useNavigate } from "react-router-dom";


const subIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
</svg>



export default function Index() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<ISubscriptionResponse>();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        GetSubscriptionPlans(page)
            .then((res) => setData(res.data))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
    }, [page]);
    
    return (<section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
        <Breadcrumb levels={[{ icon: subIcon, title: 'Subcriptions', link: '/subcriptions' }, { title: 'Subcriptions', link: '' }]} />
        <DynamicTable title='Subscription Plans' defaultAction={(e: any) => navigate(`/subcriptions/detail/${e.id}`)} columns={Columns} loading={loading}
                pagination={
                    {
                        first: () => setPage(1),
                        last: () => setPage(data?.pagination.lastPage.valueOf() || 1),
                        next: () => setPage(prev => prev + 1),
                        prev: () => setPage(prev => prev - 1),
                        ...(data?.pagination!),
                    }
                }
                rows={data?.items || []} />
    </section>)
}