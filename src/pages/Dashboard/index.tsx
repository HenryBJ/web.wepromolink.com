import { stat } from "fs";
import Dash from "../../components/Dash";
import DashBar, { IStats } from "../../components/DashBar";
import DashLine from "../../components/DashLine";
import DashPie from "../../components/DashPie";



const stats:IStats = {
    title:'Clicks by Countries',
    labels:['Alemania', 'Estados Unidos', 'Cuba', 'Republica Dominicana','Canada','Uruguay'],
    data:[[23,45,63,43,77,22],[78,10,54,1,200,43]],
    dataLabels:['Yesterday','Today']

};



export default function Balance() {
    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-2 flex-wrap  justify-center items-start">
                <Dash title="Available" data={2343} transform={(e) => `$${e}`} trend={true} />
                <Dash title="Available" data={2343} transform={(e) => `$${e}`} trend={false} />
                <Dash title="Available" data={2343} transform={(e) => `$${e}`} />
                <Dash title="Available" data={2343} transform={(e) => `$${e}`} />
                <DashPie title={stats.title} data={stats} />
                <DashLine title={stats.title} data={stats} />
                <DashBar title={stats.title} data={stats} />
            </div>
        </section>)
}