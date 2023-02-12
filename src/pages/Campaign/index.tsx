import DynamicTable from "../../components/DynamicTable";
import SearchBar from "../../components/SearchBar";
import { Columns } from "./columns";

export default function Campaign() {
    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <div className="w-full flex flex-col-reverse items-center sm:flex-row justify-around gap-2 sm:gap-7">
                <SearchBar />
                <button type="button" className="min-w-[180px] ml-auto focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">Create New Campaign</button>
            </div>
            <DynamicTable defaultAction={(e: any) => alert(e.id)} columns={Columns} rows={
                [
                    { id: "1", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "2", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "3", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: false, budget: "$0", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "4", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "5", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    { id: "6", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: false, budget: "$0", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // { id: "7", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // { id: "8", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // { id: "9", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // { id: "10", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // { id: "11", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "12", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "13", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "14", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "15", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "16", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "17", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "18", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "19", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "20", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "21", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "22", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "23", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "24", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "25", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "26", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "27", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "28", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "29", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "30", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "31", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "32", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "33", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "34", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "35", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "36", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "37", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "38", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "39", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "40", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "41", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "42", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "43", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                    // // { id: "44", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: "$95", epm: "$15", lastClick: "2 hours ago", lastShared: "3 days ago" },
                ]
            } />



        </section>
    )
}