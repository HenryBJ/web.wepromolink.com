import { IPagination, IPaginationExtended } from "../../interfaces/IPagination";


interface IProps {
    pagination: IPaginationExtended
}


export default function Index({ pagination }: IProps) {

    return (<div className="sticky bottom-0  w-full">
        <div className="bg-orange-500 px-6 py-1 text-center flex gap-5 items-center justify-center">
            {(pagination.page.valueOf() !== 1) && <>
                <div className="text-white cursor-pointer" onClick={() => pagination?.first()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div className="text-white cursor-pointer" onClick={() => pagination?.prev(pagination.page.valueOf() - 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </>}
            <span className="text-white cursor-default">{`${pagination?.page.toString()} of ${pagination?.totalPages.toString()}`}</span>
            
            {(pagination.page.valueOf() !== pagination.totalPages.valueOf()) && <>
                <div className="text-white cursor-pointer" onClick={() => pagination?.next(pagination.page.valueOf() + 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            <div className="text-white cursor-pointer" onClick={() => pagination?.last()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            </>}

        </div>
    </div>)
}