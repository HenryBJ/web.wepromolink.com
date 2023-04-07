import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../pages/Campaign/columns";
import CopyButton from "../CopyButton";


export interface IField {
    value: any;
    valueType: string;
    title: string;
    isImage: boolean;
    isHidden: boolean;
    order: number;
    fnwidth?:(value:number)=>number;
    transform?:(value:any)=>any;
}

export interface IGenericDetailData {
    fields: IField[];
    title: string;
}

interface Props {
    prepare: () => IGenericDetailData | undefined
}

export default function Index({ prepare }: Props) {
    const myRef = useRef(null);
    const [width, setWidth] = useState<any>(0);

    const handleResize = () => {
        myRef.current && setWidth(myRef.current['offsetWidth']);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigation = useNavigate();

    const handleBack = () => {
        navigation(-1);
    }

    const data = prepare();
    const title = data?.title;

    const Draw = (item: IField) => {
        switch (item.valueType) {
            case 'string':
                return item.transform ? item.transform(item.value):item.value;

            case 'image':
                return (
                    <div className="flex justify-start items-center px-0">
                        <img className="h-full w-80 rounded ring-2 ring-orange-500" src={item.value} alt="Image preview" />
                    </div>
                )

            case 'url':
                return (
                    <div className="relative w-full rounded-md shadow-sm ">
                        <input type="text" name="link" value={item.value} disabled className="cursor-text block w-full rounded-md border-gray-300 px-2 text-sm h-8" />
                        {/* <div className="absolute inset-y-0 right-0 flex items-center">
                            <CopyButton text={item.value} />
                        </div> */}
                    </div>
                );

            case 'date':
                return item.transform ? item.transform(item.value):timeSince(item.value);

            case 'boolean':
                return item.transform ? item.transform(item.value):item.value;

            case 'number':
                return item.transform ? item.transform(item.value) :(item.value as number).toString();

            default:
                return 'valueType not supported';
        }
    }



    // useEffect(() => {
    //     console.log(data);
    // }, []);

    return (
        <div ref={myRef} className="relative w-full bg-gray-200 flex flex-col rounded shadow-xl">
            <div className="absolute top-1 left-3 text-white cursor-pointer hover:text-gray-300" onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className="h-9 w-full rounded-t bg-orange-500 uppercase text-white flex items-center justify-center font-bold  ">
                {title}
            </div>
            <div className="flex flex-wrap gap-1 justify-between bg-white">
                {data?.fields.filter(k => !k.isHidden).sort((a, b) => a.order - b.order).map((e, index) => {
                    return (
                        <div key={index} className="min-h-[60px] bg-white shadow px-2 py-2 flex-grow flex flex-col gap-1" style={e.fnwidth ? {width:e.fnwidth(width)}:{}}>
                            <span className="font-semibold text-gray-800">{e.title}</span>
                            {Draw(e)}
                            {/* <label>{width}</label> */}
                        </div>
                    )
                })}
                <div className="min-h-[60px] bg-white shadow px-2 py-2 flex items-center justify-center w-full">
                    <button type="button" onClick={handleBack} className="min-w-[200px] focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">Back</button>
                </div>
            </div>
        </div>
    )
}