import { useEffect, useState } from "react";
import { Bar} from "react-chartjs-2";
import Spinner from "../Spinner";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { AxiosResponse } from "axios";
import { IStats } from "../../interfaces/ViewModels";
import { IStatsResponse } from "../../interfaces/Responses";


interface IProps {
    title: string,
    transform?: (value: any) => any,
    load?(): Promise<AxiosResponse<IStats>>,
    data?: IStats
}

interface IBarData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
    }[];
}

const options = (title: string, showLegend:boolean = false) => ({
    responsive: true,
    plugins: {
        legend: {
            display:showLegend, 
            position: 'top' as const,
        },
        title: {
            display: false,
            text: title,
        },
    },
});
const generateRandomColors = (n: Number) => {
    const colors = [];
    for (let i = 0; i < n; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const alpha = 0.8;
        colors.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);
    }
    return colors;
}

const transformAdapter: (value: IStats) => IBarData = (value) => {
    let colors = generateRandomColors(value.data.length);
    
    const filteredLabels  = value.labels.filter((label) => label !== "");
    const filteredData = value.data[0].filter((data, index) => value.labels[index] !== "");

    let output: IBarData = {
        labels: filteredLabels, datasets:[{
            data: filteredData,
            backgroundColor: colors,
            borderColor: colors,
            label: ''
        }]
    }
    return output
}


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const hasData = (data: IBarData | undefined): boolean => {
    if (!data) return false;
    return !data.labels.every(e => e === "");
}


export default function Index({ title, load, transform, data }: IProps) {
    const [loading, setLoading] = useState(false);
    const [pdata, setPData] = useState<IBarData>();

    useEffect(() => {
        if (load) {
            setLoading(true);
            load()
                .then(res => {
                    if (transform) {
                        setPData(transformAdapter(transform(res.data)))
                    } else {
                        setPData(transformAdapter(res.data))
                    }
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        } else if (transform) {
            setPData(transformAdapter(transform(data)))
        } else {
            data && setPData(transformAdapter(data))
        }
    }, []);


    return (
        <div className="flex-grow bg-white rounded shadow-lg cursor-pointer">
            <div className="h-10 bg-orange-500 rounded-t text-white uppercase font-bold flex justify-center items-center">
                {title}
            </div>
            <div className="h-72  rounded-b p-2 flex justify-center items-center text-2xl gap-1">
                {loading ? <Spinner text="" /> : hasData(pdata) ? <Bar className="w-full" options={options(data?.title || 'Stats', data && data?.data.length > 1)} data={pdata!} /> : "No data available"}
            </div>
        </div>)
}