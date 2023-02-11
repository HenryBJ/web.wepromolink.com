import { ReactElement } from "react"
import { Transform } from "stream"
import { JsxFragment } from "typescript"
import { IExtraActions } from "../../interfaces/IExtraActions"
import ActionMenu from "../ActionMenu"



export interface IColumnData {
    title: string,
    name: string,
    hidden: boolean,
    transform?:(value:any)=>any,
    extraActions?: IExtraActions[]
}

interface IDynamicTable {
    columns: IColumnData[],
    rows: any[],
    defaultAction?: (value: any) => void,
}


export default function Index({ columns, rows, defaultAction }: IDynamicTable) {
    return (
        <div className="relative  rounded shadow-xl w-full">
            <table className="w-full text-sm text-left text-white rounded shadow-xl">
                <thead className="text-xs text-white uppercase bg-orange-500">
                    <tr>
                        {columns.filter(e => !e.hidden).map(Column =>
                        (<th key={Column.name} scope="col" className="px-6 py-3">
                            {Column.title}
                        </th>))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr className="bg-white border-b text-gray-700 text-left hover:bg-gray-200 cursor-pointer" key={rowIndex}>
                            {columns.filter(e => !e.hidden).map((column, index) => {
                                if (column.extraActions) {
                                    return (
                                        <td key={index} className="px-6 py-2 text-center">
                                            <ActionMenu item={row} actions={column.extraActions} />
                                        </td>)
                                }
                                else
                                    return (index === 0 ?
                                        <th key={index} onClick={() => defaultAction && defaultAction(row)} scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            {column.transform ? column.transform(row[column.name]):row[column.name]}
                                        </th> : <td key={index} onClick={() => defaultAction && defaultAction(row)} className="px-6 py-2">
                                        {column.transform ? column.transform(row[column.name]):row[column.name]}
                                        </td>)
                            }

                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
}