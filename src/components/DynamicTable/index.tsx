import { useEffect, useRef, useState } from "react";
import { IExtraActions } from "../../interfaces/IExtraActions"
import { IPagination, IPaginationExtended } from "../../interfaces/IPagination";
import ActionMenu from "../ActionMenu"
import Loader from "../Loader";
import Pagination from "../Pagination";
import { set } from "react-hook-form";
import NoData from "../NoData";



export interface IColumnData {
    title: string,
    name: string,
    hidden: (value?: any) => boolean,
    transform?: (value: any) => any,
    maxWidth?: (value: any) => number,
    extraActions?: (value: any) => IExtraActions[],
}

interface IDynamicTable {
    title?: string,
    columns: IColumnData[],
    rows: any[],
    defaultAction?: (value: any) => void,
    pagination?: IPaginationExtended,
    loading: boolean,
    setLoading?: (value: React.SetStateAction<boolean>) => void,
    reload?: () => void,
    onTap?: (item: any, option: Number) => void
}

export default function Index({ title, columns, rows, defaultAction, pagination, loading = false, setLoading, reload, onTap }: IDynamicTable) {
    const myRef = useRef(null);
    const [width, setWidth] = useState<any>(0);

    const handleResize = () => {
        myRef.current && setWidth(myRef.current['offsetWidth']);
    };

    useEffect(() => {
        if (myRef.current) {
            const table: any = myRef.current;
            const delta = width < 752 ? 12 : 10;
            table.style.minHeight = `calc(100vh - ${table.offsetTop + delta}px)`;
        }
    }, [width]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <div ref={myRef} className="relative rounded shadow-xl w-full max-h-32 overflow-y-auto">
                {/* <p>Ancho actual: {width}px</p> */}
                {!rows.length ? loading ? "" : <NoData />
                    :
                    <table className="w-full text-sm text-left text-white rounded shadow-xl">
                        <thead className="text-xs text-white uppercase bg-orange-500">
                            {title ?
                                <tr>
                                    <td className="px-2 py-1 text-xs font-bold text-center" colSpan={columns.length}>
                                        {title}
                                    </td>
                                </tr> : ''}
                            <tr>
                                {columns.filter(e => !e.hidden(width)).map(Column =>
                                (<th key={Column.name} scope="col" className="px-6 py-3 text-[0.7rem]">
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
                                                    <ActionMenu key={rowIndex} item={row} actions={column.extraActions(row)} reload={reload} onTap={(option) => onTap && onTap(row, option)} setLoading={setLoading}  />
                                                </td>)
                                        }
                                        else
                                            return (index === 0 ?
                                                <th key={index} style={column.maxWidth ? { maxWidth: column.maxWidth(width) } : {}} onClick={() => defaultAction && defaultAction(row)} scope="row" className={"truncate px-6 py-2 font-medium text-gray-900 whitespace-nowrap"}>
                                                    {column.transform ? column.transform(row[column.name]) : row[column.name]}
                                                </th> : <td key={index} style={column.maxWidth ? { maxWidth: column.maxWidth(width) } : {}}  onClick={() => defaultAction && defaultAction(row)} className={"px-6 py-2 truncate whitespace-nowrap"}>
                                                    {column.transform ? column.transform(row[column.name]) : row[column.name]}
                                                </td>)
                                    }

                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                {pagination && rows.length !== 0 && <Pagination pagination={pagination} />}
            </div>
            {loading && <Loader />}
        </>
    )
}