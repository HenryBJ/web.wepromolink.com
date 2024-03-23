import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../components/DynamicTable";
import SearchBar from "../../components/SearchBar";
import { Columns } from "./columns";
import { getMyLinks } from "../../services";
import { IMyLink, IPushNotification } from "../../interfaces/ViewModels";
import { IPaginationResponse } from "../../interfaces/Responses";
import useVisit from "../../hooks/Visit";
import { NotificationContext } from "../../hooks/NotificationProvider";
import { INotificationContext } from "../../interfaces/Common";
import Reloader from "../../components/Reloader";

export default function Index() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<IPaginationResponse<IMyLink>>()
    const [reload, setReload] = useState(false);

    const {
        notification,
        reducePushNotification
    } = useContext<INotificationContext>(NotificationContext);

    const navigate = useNavigate();

    const handleSearch = (keyword: string) => {
        setFilter(keyword)
        setPage(1);
    }

    useVisit('visit_shared');

    useEffect(() => {
        setReload(notification.links > 0)
    }, [notification.links])

    useEffect(() => {
        handleShared();
    }, [page, filter]);

    const handleShared = () => {
        setLoading(true);
        reducePushNotification(({ links, ...rest }: IPushNotification) => ({ links: 0, ...rest }));
        getMyLinks(page, filter, Number(11))
            .then((res) => setData(res.data))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
    }

    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <div className="w-full flex flex-col-reverse items-center sm:flex-row justify-around gap-2 sm:gap-7">
                <SearchBar onChange={handleSearch} />
            </div>
            <DynamicTable defaultAction={(e: any) => navigate(`/links/detail/${e.id}`)} columns={Columns} loading={loading}
                pagination={
                    {
                        first: () => setPage(1),
                        last: () => setPage(data?.pagination.totalPages.valueOf() || 1),
                        next: () => setPage(prev => prev + 1),
                        prev: () => setPage(prev => prev - 1),
                        ...(data?.pagination!),
                    }
                }
                rows={data?.items || []} />
            <Reloader callback={() => handleShared()} isVisible={reload} />
        </section>
    )
}