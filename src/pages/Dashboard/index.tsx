import { stat } from "fs";
import Dash from "../../components/Dash";
import DashBar from "../../components/DashBar";
import DashLine from "../../components/DashLine";
import DashPie from "../../components/DashPie";
import DashPrice from "../../components/DashPrice";
import { getAvailableBalanceData, getProfitBalanceData } from "../../services";
import { getClickOnCampaignsByCountries, getClickOnLinksByCountries, getClicksLastWeekOnCompaignData, getClicksLastWeekOnLinkData, getClicksTodayOnCompaignData, getClicksTodayOnLinkData, getEarnByCountries, getEarnLastWeekData, getEarnTodayData, getHistoricalClickOnCampaigns, getHistoricalClickOnLinks, getHistoricalClickOnShares, getHistoricalEarnOnLinks, getSharedByUsers, getSharedLastWeekData, getSharedTodayData } from "../../services";
import useVisit from "../../hooks/Visit";



export default function Dashboard() {
    useVisit('visit_dashboard');

    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 pb-6 h-full flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-2 flex-wrap  justify-center items-start">
                <DashPrice title="Available" load={getAvailableBalanceData} helpTip={'This is the amount of money from the user\'s budget that has not yet been assigned to any campaigns. It represents the funds that are still available for the user to allocate to new or existing campaigns.'} />
                <DashPrice title="Profit" load={getProfitBalanceData} helpTip={'This is the amount of money that the user has earned from the clicks received on their shared links. It represents the revenue generated from the user\'s campaigns and is available for withdrawal.'} />
                <DashPrice title="Earn Today" load={getEarnTodayData}/>
                <DashPrice title="Earn Last Week" load={getEarnLastWeekData}/>
                <Dash title="Today on links" load={getClicksTodayOnLinkData} transform={(e) => `${e} clicks`} />
                <Dash title="Last Week on links" load={getClicksLastWeekOnLinkData} transform={(e) => `${e} clicks`} />
                <Dash title="Today on campaigns" load={getClicksTodayOnCompaignData} transform={(e) => `${e} clicks`} />
                <Dash title="Last Week on campaigns" load={getClicksLastWeekOnCompaignData} transform={(e) => `${e} clicks`} />
                <Dash title="Shared Today" load={getSharedTodayData} transform={(e) => `${e} shared`} />
                <Dash title="Shared Last Week" load={getSharedLastWeekData} transform={(e) => `${e} shared`} />
                <DashLine title="Clicks on links" load={getHistoricalClickOnLinks} precision={0} showXGrid={false} showYGrid={false} stepSize={1} />
                <DashLine title="Earn on links" load={getHistoricalEarnOnLinks} precision={3} showXGrid={false} showYGrid={false} stepSize={1} />
                <DashLine title="Clicks on campaigns" load={getHistoricalClickOnCampaigns} precision={0} showXGrid={false} showYGrid={false} stepSize={1} />
                <DashLine title="Clicks on shares" load={getHistoricalClickOnShares} precision={0} showXGrid={false} showYGrid={false} stepSize={1} />
                <DashPie title="Click by countries on links" load={getClickOnLinksByCountries} />
                <DashPie title="Earn by countries" load={getEarnByCountries} />
                <DashPie title="Click by countries on campaign" load={getClickOnCampaignsByCountries} />
                <DashBar title="Shared by users" load={getSharedByUsers} />

                {/* <DashPie title={stats.title} data={stats} />
                <DashLine title={stats.title} data={stats} />
                <DashBar title={stats.title} data={stats} /> */}
            </div>
        </section>)
}