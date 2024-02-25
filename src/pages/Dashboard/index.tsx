import DashPrice from "../../components/DashPrice";
import { getAvailableBalanceData, getProfitBalanceData } from "../../services";
import useVisit from "../../hooks/Visit";



export default function Dashboard() {
    useVisit('visit_dashboard');

    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 pb-6 h-full flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-2 flex-wrap  justify-center items-start">
                <DashPrice title="Available" load={getAvailableBalanceData} helpTip={'This is the amount of money from the user\'s budget that has not yet been assigned to any campaigns. It represents the funds that are still available for the user to allocate to new or existing campaigns.'} />
                <DashPrice title="Profit" load={getProfitBalanceData} helpTip={'This is the amount of money that the user has earned from the clicks received on their shared links. It represents the revenue generated from the user\'s campaigns and is available for withdrawal.'} />
            </div>
        </section>)
}