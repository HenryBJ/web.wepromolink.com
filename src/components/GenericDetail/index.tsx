import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CopyButton from "../CopyButton";
import Dash from "../Dash";
import DashLine from "../DashLine";
import DashBar from "../DashBar";
import DashPie from "../DashPie";
import { AxiosResponse } from "axios";
import { IStats } from "../../interfaces/ViewModels";
import { timeSince } from "../../common";
import ImageViewer from "../ImageViewer";
import DashGeneric from "../DashGeneric";
import DashPrice from "../DashPrice";


export interface IField {
    value: any;
    valueType: string;
    title: string;
    collectionName?: string;
    externalId?: string;
    isImage: boolean;
    isHidden: boolean;
    hideTitle?: boolean,
    order: number;
    fnwidth?: (value: number) => number;
    transform?: (value: any) => any;
    load?(): Promise<AxiosResponse<any>>;
}

export interface IGenericDetailData {
    fields: IField[];
    title: string;
}

export interface IExtraAction {
    title: string,
    fn: (value: any) => void
}

interface Props {
    prepare: () => IGenericDetailData | undefined,
    actions?: IExtraAction[]
}

export default function Index({ prepare, actions }: Props) {
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

            case 'html':
                return <div dangerouslySetInnerHTML={{ __html: item.transform ? item.transform(item.value) : item.value }} />;

            case 'string':
                return item.transform ? item.transform(item.value) : item.value;

            case 'image':
                return (
                <div className="h-full flex justify-center items-center">
                    <ImageViewer ImageBundle={item.value} FixWidth={265} Scale={1} />
                </div>)

            case 'dash':
                if (item.load) {
                    return <Dash title={item.title} load={item.load} transform={item.transform ? item.transform : (e) => e} />
                }
                return <Dash title={item.title} data={item.transform ? item.transform(item.value) : item.value} />

            case 'dash-money':
                    if (item.load) {
                        return <DashPrice title={item.title}  load={item.load} />
                    }
                    return <DashPrice title={item.title} data={item.transform ? item.transform(item.value) : item.value} />    
            
            case 'generic-line':
                if (item.collectionName && item.externalId) {
                    return <DashGeneric title={item.title} type="Line" collectionName={item.collectionName} externalId={item.externalId} />
                }
                return <div>CollectionName and ExternalId missing</div>
            
            case 'generic-money':
                    if (item.collectionName && item.externalId) {
                        return <DashGeneric title={item.title} type="Line-Money" collectionName={item.collectionName} externalId={item.externalId} />
                    }
                    return <div>CollectionName and ExternalId missing</div>    

            case 'generic-pie':
                if (item.collectionName && item.externalId) {
                    return <DashGeneric title={item.title} type="Pie" collectionName={item.collectionName} externalId={item.externalId} />
                }
                return <div>CollectionName and ExternalId missing</div>

            case 'line':
                if (item.load) {
                    return <DashLine title={item.title} load={item.load} precision={0} showXGrid={false} showYGrid={false} stepSize={1} />
                }
                return <DashLine title={item.title} data={item.value} precision={0} showXGrid={false} showYGrid={false} stepSize={1} />

            case 'bar':
                if (item.load) {
                    return <DashBar title={item.title} load={item.load} />
                }
                return <DashBar title={item.title} data={item.value} />

            case 'pie':
                if (item.load) {
                    return <DashPie title={item.title} load={item.load} />
                }
                return <DashPie title={item.title} data={item.value} />

            case 'url':
                return (
                    <div className="relative w-full rounded-md shadow-sm ">
                        <input type="text" name="link" value={item.value} disabled className="cursor-text block w-full rounded-md border-gray-300 px-2 text-sm h-8" />
                    </div>
                );

            case 'date':
                return item.transform ? item.transform(item.value) : timeSince(item.value);

            case 'boolean':
                return item.transform ? item.transform(item.value) : item.value;

            case 'number':
                return item.transform ? item.transform(item.value) : (item.value as number).toString();

            default:
                return 'valueType not supported';
        }
    }

    return (
        <div ref={myRef} className="relative w-full bg-gray-200 flex flex-col rounded shadow-xl">
            <div className="absolute top-1 left-3 text-gray-800 cursor-default md:cursor-pointer hover:text-orange-500" onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className="h-9 w-full rounded-t bg-gray-300 uppercase text-gray-800 flex items-center justify-center font-bold  ">
                <div style={{ width: width - 100 }} className='truncate text-center'>
                    {title}
                </div>
            </div>
            <div className="flex flex-wrap gap-1 justify-between bg-white">
                {data?.fields.filter(k => !k.isHidden).sort((a, b) => a.order - b.order).map((e, index) => {
                    return (
                        <div key={index} className="min-h-[60px] bg-white shadow px-2 py-2 flex-grow flex flex-col gap-1" style={e.fnwidth ? { width: e.fnwidth(width) } : {}}>
                            {!e.hideTitle && <span className="font-semibold text-gray-800">{e.title}</span>}
                            {Draw(e)}
                        </div>
                    )
                })}
                <div className="min-h-[60px] bg-white shadow px-2 py-2 flex flex-wrap-reverse items-center justify-center w-full gap-2">
                    <button type="button" onClick={handleBack} className="min-w-[200px] focus:outline-none shadow-md text-gray-800 bg-gray-300 hover:bg-orange-500 hover:text-white focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">Back</button>
                    {actions && actions.map((item: IExtraAction, index) => (
                        <button key={index} type="button" onClick={() => item.fn(data)} className="min-w-[200px] shadow-md focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">{item.title}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}