import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../components/DynamicTable";
import SearchBar from "../../components/SearchBar";
import { IMyCampaignsResponse } from "../../interfaces/Responses";
import { GetMyCampaigns } from "../../services/CampaignService";
import { Columns } from "./columns";

export default function Campaign() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<IMyCampaignsResponse>()
    const navigate = useNavigate();
    const handleSearch = (keyword:string)=>{
        setFilter(keyword)
    }

    const handleClick = () =>{
        navigate("/create");
    }

    useEffect(() => {
        setLoading(true);
        GetMyCampaigns(page,filter)
            .then((res) => setData(res.data))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
    }, [page, filter]);

    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <div className="w-full flex flex-col-reverse items-center sm:flex-row justify-around gap-2 sm:gap-7">
                <SearchBar onChange={handleSearch} />
                <button type="button" onClick={handleClick}  className="min-w-[180px] ml-auto focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">Create New Campaign</button>
            </div>
            <DynamicTable defaultAction={(e: any) => alert(e.id)} columns={Columns} loading={loading}
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
        </section>
    )
}