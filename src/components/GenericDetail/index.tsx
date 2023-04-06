import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../pages/Campaign/columns";


export interface IField {
    value: any;
    valueType: string;
    title: string;
    isImage: boolean;
    isHidden: boolean;
}

export interface IGenericDetailData {
    fields: IField[];
    title: string;
}

interface Props {
    prepare: () => IGenericDetailData | undefined
}

export default function Index({ prepare }: Props) {

    const navigation = useNavigate();

    const handleBack = () => {
        navigation(-1);
    }

    const data = prepare();
    const title = data?.title;

    const Draw = (item: IField) => {
        switch (item.valueType) {
            case 'string':
                return item.value;

            case 'image':
                return (
                    <div className="flex justify-start items-center px-0">
                        <img className="h-full w-80 rounded ring-2 ring-orange-500" src={item.value} alt="Image preview" />
                    </div>
                )

            case 'date':
                return timeSince(item.value);

            case 'boolean':
                return item.value;

            case 'number':
                return (item.value as number).toString();

            default:
                return 'valueType not supported';
        }
    }



    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <div className="relative w-full bg-gray-200 flex flex-col rounded shadow-xl">
            <div className="absolute top-1 left-3 text-white cursor-pointer hover:text-gray-300" onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className="h-9 w-full rounded-t bg-orange-500 uppercase text-white flex items-center justify-center font-bold  ">
                {title}
            </div>
            <div className="flex flex-col gap-1 justify-between bg-white">
                {data?.fields.filter(k => !k.isHidden).map((e, index) => {
                    return (
                        <div key={index} className="min-h-[60px] bg-white shadow px-2 py-2 flex-grow flex flex-col gap-1">
                            <span className="font-semibold text-gray-800">{e.title}</span>
                            {Draw(e)}
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