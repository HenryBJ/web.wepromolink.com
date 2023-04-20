import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Spinner from "../Spinner";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { AxiosResponse } from "axios";

export interface IStats {
    title: string,
    labels: string[],
    data: number[][],
    dataLabels:string[]
}

interface IProps {
    title: string,
    transform?: (value: any) => any,
    load?(): Promise<AxiosResponse<IStats>>,
    data?: IStats
}

interface ILineData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
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

const transformAdapter: (value: IStats) => ILineData = (value) => {
    let colors = generateRandomColors(value.data.length);
    let output: ILineData = {
        labels: value.labels, datasets:value.data.map((e, index)=>({
            data: e,
            backgroundColor: colors[index],
            borderColor: colors[index],
            label: value.dataLabels[index]
        }))
    }
    return output
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default function Index({ title, load, transform, data }: IProps) {
    const [loading, setLoading] = useState(false);
    const [pdata, setPData] = useState<ILineData>();

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
                {loading ? <Spinner text="" /> : pdata && <Line className="w-full" options={options(data?.title || 'Stats', data && data?.data.length > 1)} data={pdata} />}
            </div>
        </div>)
}