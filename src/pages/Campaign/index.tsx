import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../components/DynamicTable";
import SearchBar from "../../components/SearchBar";
import { getMyCampaigns } from "../../services";
import { Columns } from "./columns";
import { IMyCampaign } from "../../interfaces/ViewModels";
import SubscribeWrapper from "../../components/SubscribeWrapper";
import { IPaginationResponse } from "../../interfaces/Responses";

export default function Campaign() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    let [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [rowSelected, setRowSelected] = useState<IMyCampaign>();
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<IPaginationResponse<IMyCampaign>>()
    const navigate = useNavigate();
    const handleSearch = (keyword: string) => {
        setFilter(keyword)
    }

    const handleClick = () => {
        navigate("/create");
    }

    const handleInfo = () => {
        setLoading(true);
        getMyCampaigns(page, filter, Number(11))
            .then((res) => setData(res.data))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        handleInfo();
    }, [page, filter]);

    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <div className="w-full flex flex-col-reverse items-center sm:flex-row justify-around gap-2 sm:gap-7">
                <SearchBar onChange={handleSearch} />
                <button type="button">
                    <SubscribeWrapper onClick={handleClick} style="min-w-[180px] ml-auto focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">
                        Create New Campaign
                    </SubscribeWrapper>
                </button>

            </div>


            <DynamicTable
                reload={() => handleInfo()}
                defaultAction={(e: any) => navigate(`/campaigns/detail/${e.id}`)}
                columns={Columns}
                loading={loading}
                setLoading={setLoading}
                onTap={(item, option) => {
                    if (option == 3) {
                        setIsOpen(true);
                        setRowSelected(item);
                    }
                }}
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
        </section>
    )
}