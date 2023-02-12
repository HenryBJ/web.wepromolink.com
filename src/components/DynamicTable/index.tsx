import { useEffect, useRef, useState } from "react";
import { IExtraActions } from "../../interfaces/IExtraActions"
import ActionMenu from "../ActionMenu"



export interface IColumnData {
    title: string,
    name: string,
    hidden: (value?:any)=>boolean,
    transform?: (value: any) => any,
    extraActions?: IExtraActions[]
}

interface IDynamicTable {
    columns: IColumnData[],
    rows: any[],
    defaultAction?: (value: any) => void,
}

export default function Index({ columns, rows, defaultAction }: IDynamicTable) {
    const myRef = useRef(null);
    const [width, setWidth] = useState<any>(0);

    const handleResize = () => {
        myRef.current &&setWidth(myRef.current['offsetWidth']);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={myRef} className="relative rounded shadow-xl w-full">
            {/* <p>Ancho actual: {width}px</p> */}
            <table className="w-full text-sm text-left text-white rounded shadow-xl">
                <thead className="text-xs text-white uppercase bg-orange-500">
                    <tr>
                        {columns.filter(e => !e.hidden(width)).map(Column =>
                        (<th key={Column.name} scope="col" className="px-6 py-3">
                            {Column.title}
                        </th>))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr className="bg-white border-b text-gray-700 text-left hover:bg-gray-200 cursor-pointer" key={rowIndex}>
                            {columns.filter(e => !e.hidden(width)).map((column, index) => {
                                if (column.extraActions) {
                                    return (
                                        <td key={index} className="px-6 py-2 text-center">
                                            <ActionMenu item={row} actions={column.extraActions} />
                                        </td>)
                                }
                                else
                                    return (index === 0 ?
                                        <th key={index} onClick={() => defaultAction && defaultAction(row)} scope="row" className={"px-6 py-2 font-medium text-gray-900 whitespace-nowrap"}>
                                            {column.transform ? column.transform(row[column.name]) : row[column.name]}
                                        </th> : <td key={index} onClick={() => defaultAction && defaultAction(row)} className={"px-6 py-2"}>
                                            {column.transform ? column.transform(row[column.name]) : row[column.name]}
                                        </td>)
                            }

                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
}