import { stat } from "fs";
import Dash from "../../components/Dash";
import DashBar, { IStats } from "../../components/DashBar";
import DashLine from "../../components/DashLine";
import DashPie from "../../components/DashPie";
import { GetAvailableBalanceData, GetProfitBalanceData } from "../../services/TransactionService";
import { GetClickOnCampaignsByCountries, GetClickOnLinksByCountries, GetEarnByCountries, GetHistoricalClickOnCampaigns, GetHistoricalClickOnLinks, GetHistoricalClickOnShares, GetHistoricalEarnOnLinks, GetSharedByUsers } from "../../services/DashboardService";



const stats:IStats = {
    title:'Clicks by Countries',
    labels:['Alemania', 'Estados Unidos', 'Cuba', 'Republica Dominicana','Canada','Uruguay'],
    data:[[23,45,63,43,77,22],[78,10,54,1,200,43]],
    dataLabels:['Yesterday','Today']
};



export default function Dashboard() {
    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-2 flex-wrap  justify-center items-start">
                <Dash title="Available" load={GetAvailableBalanceData} transform={(e) => `$${e}`} />
                <Dash title="Profit" load={GetProfitBalanceData} transform={(e) => `$${e}`} helpTip={'This is the amount of money that the user has earned from the clicks received on their shared links. It represents the revenue generated from the user\'s campaigns and is available for withdrawal.'} />
                <Dash title="Earn Today" data={2343} transform={(e) => `$${e}`} />
                <Dash title="Earn Last Week" data={2343} transform={(e) => `$${e}`} />
                <Dash title="Today on links" data={23} transform={(e) => `${e} clicks`} />
                <Dash title="Last Week on links" data={2343} transform={(e) => `${e} clicks`} />
                <Dash title="Today on campaigns" data={23} transform={(e) => `${e} clicks`} />
                <Dash title="Last Week on campaigns" data={2343} transform={(e) => `${e} clicks`} />
                <Dash title="Shared Today" data={2} transform={(e) => `${e} shared`} />
                <Dash title="Shared Last Week" data={12} transform={(e) => `${e} shared`} />
                <DashLine title="Clicks on links" load={GetHistoricalClickOnLinks} />
                <DashLine title="Earn on links" load={GetHistoricalEarnOnLinks} />
                <DashLine title="Clicks on campaigns" load={GetHistoricalClickOnCampaigns} />
                <DashLine title="Clicks on shares" load={GetHistoricalClickOnShares} />
                <DashPie title="Click by countries on links" load={GetClickOnLinksByCountries} />
                <DashPie title="Earn by countries" load={GetEarnByCountries} />
                <DashPie title="Click by countries on campaign" load={GetClickOnCampaignsByCountries} />
                <DashBar title="Shared by users" load={GetSharedByUsers} />
                
                {/* <DashPie title={stats.title} data={stats} />
                <DashLine title={stats.title} data={stats} />
                <DashBar title={stats.title} data={stats} /> */}
            </div>
        </section>)
}