import { useEffect, useState } from "react";
import HelpTip from "../HelpTip";
import Spinner from "../Spinner";

interface IProps {
    title: string,
    data?: any,
    transform?: (value: any) => any,
    load?(): Promise<any>,
    trend?: boolean,
    helpTip?: string
}

const trendUp = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
</svg>

const trendDown = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
</svg>




export default function Index({ title, data, transform, load, trend, helpTip }: IProps) {
    const [loading, setLoading] = useState(false);
    const [pdata, setPData] = useState();

    useEffect(() => {
        if (load) {
            setLoading(true);
            load()
                .then(res => {
                    if (transform) {
                        setPData(transform(res.data.value.valueOf()))
                    } else {
                        setPData(res.data.value.valueOf())
                    }
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        } else if (transform) {
            setPData(transform(data))
        } else {
            setPData(data)
        }
    }, []);


    return (
        <div className="flex-grow min-w-[160px] sm:min-w-[180px] bg-white min-h-[70px] sm:min-h-[120px] rounded shadow-lg cursor-default">
            <div className="relative h-7 text-sm sm:text-sm  sm:h-10 w-full bg-orange-500 rounded-t text-white uppercase font-bold flex justify-center items-center">
                {title}
                {helpTip && <HelpTip title={`Information of ${title}`} text={helpTip}/>}
            </div>
            <div className="w-full h-12 sm:h-[80px] rounded-b p-2 flex justify-center items-center text-2xl gap-1">
                {loading ? <Spinner text="" /> : pdata}
                {trend !== undefined ? trend ? trendUp : trendDown : null}
            </div>
        </div>)
}