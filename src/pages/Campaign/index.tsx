import DynamicTable from "../../components/DynamicTable";
import SearchBar from "../../components/SearchBar";
import { Columns } from "./columns";

export default function Campaign() {
    return (
        <section className="container max-w-5xl mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <div className="w-full flex items-center justify-center">
                <SearchBar />
                <button type="button" className="float-right ml-auto focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">Create New Campaign</button>
            </div>
            <DynamicTable defaultAction={(e: any) => alert(e.id)} columns={Columns} rows={
                [
                    { id: "1", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "2", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "3", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: false, budget: "$0", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "4", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "5", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "6", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: false, budget: "$0", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "7", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                ]
            } />



        </section>
    )
}