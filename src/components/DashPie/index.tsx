import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Spinner from "../Spinner";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { AxiosResponse } from "axios";
import { IStats } from "../../interfaces/ViewModels";
import { IStatsResponse } from "../../interfaces/Responses";


interface IProps {
    title: string,
    transform?: (value: any) => any,
    load?(): Promise<AxiosResponse<IStats>>,
    data?: IStats
}

interface IPieData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

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

const transformAdapter: (value: IStats) => IPieData = (value) => {
    const colorList = generateRandomColors(value.data[0].length);

    const filteredLabels  = value.labels.filter((label) => label !== "");
    const filteredData = value.data[0].filter((data, index) => value.labels[index] !== "");
    
    let output: IPieData = {
        labels: filteredLabels, 
        datasets: [
            {
                data: filteredData,
                backgroundColor: colorList,
                borderColor: colorList,
                borderWidth: 1,
                label: ''
            }]
    }
    return output
}

const hasData = (data: IPieData | undefined): boolean => {
    if (!data) return false;
    return !data.labels.every(e => e === "");
}


ChartJS.register(ArcElement, Tooltip, Legend);


export default function Index({ title, load, transform, data }: IProps) {
    const [loading, setLoading] = useState(false);
    const [pdata, setPData] = useState<IPieData>();

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
        <div className="flex-grow min-w-[300px] bg-white min-h-[300px] rounded shadow-lg cursor-pointer">
            <div className="h-10 w-full bg-orange-500 rounded-t text-white uppercase font-bold flex justify-center items-center">
                {title}
            </div>
            <div className="w-full h-72  rounded-b p-2 flex justify-center items-center text-2xl gap-1">
                {loading ? <Spinner text="" /> : hasData(pdata) ? <Pie data={pdata!} /> : "No data available"}
            </div>
        </div>)
}