import { useEffect, useState } from "react";
import Dash from "../../components/Dash";
import DynamicTable from "../../components/DynamicTable";
import { ITransactionResponse } from "../../interfaces/Responses";
import { GetTransactions } from "../../services/TransactionService";
import { Columns } from "./columns";

export default function Index() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<ITransactionResponse>()

    useEffect(() => {
        setLoading(true);
        GetTransactions(page)
            .then((res) => setData(res.data))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
    }, [page]);


    return (<section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
        <div className="w-full flex gap-2 flex-wrap justify-between xxs:justify-center items-start">
            <Dash title="Budget" data={232.98} transform={(e) => `$${e}`} trend={true} />
            <Dash title="Profit" data={34.09} transform={(e) => `$${e}`} trend={false} />
        </div>
        <DynamicTable title='Transactions' defaultAction={(e: any) => alert(e.id)} columns={Columns} loading={loading}
            pagination={
                {
                    first: () => setPage(1),
                    last: () => setPage(data?.pagination.lastPage.valueOf() || 1),
                    next: () => setPage(prev => prev + 1),
                    prev: () => setPage(prev => prev - 1),
                    ...(data?.pagination!),
                }
            }
            rows={data?.items || []} />
    </section>)
}