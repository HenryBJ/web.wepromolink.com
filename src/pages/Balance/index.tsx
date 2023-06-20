import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dash from "../../components/Dash";
import DynamicTable from "../../components/DynamicTable";
import { ITransactionResponse } from "../../interfaces/Responses";
import { getAvailableBalanceData, getBudgetBalanceData, getLockedBalanceData, getPayoutBalanceData, getProfitBalanceData, getTransactions } from "../../services";
import { Columns } from "./columns";
import SubscribeWrapper from "../../components/SubscribeWrapper";

export default function Index() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<ITransactionResponse>()
    const navigation = useNavigate();

    useEffect(() => {
        setLoading(true);
        getTransactions(page)
            .then((res) => setData(res.data))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
    }, [page]);

    const goToDeposit = () => {
        navigation("/deposit");
    }

    const goToWithdraw = () => {
        navigation("/withdraw");
    }


    return (<section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
        <div className="w-full flex items-center flex-wrap flex-row justify-center gap-2">

            <button type="button">
                <SubscribeWrapper onClick={() => goToDeposit()} style="min-w-[180px] focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2" >
                    Deposit
                </SubscribeWrapper>
            </button>
            <button type="button" onClick={() => goToWithdraw()} className="min-w-[180px] focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">Withdraw</button>

        </div>
        <div className="w-full flex gap-2 flex-wrap justify-between xxs:justify-center items-start">
            <Dash title="Budget" load={getBudgetBalanceData} transform={(e) => `$${e}`} helpTip={'This is the overall amount of money that a user has available to allocate to campaigns. It represents the total funds that the user has for investing in their campaigns.'} />
            <Dash title="Available" load={getAvailableBalanceData} transform={(e) => `$${e}`} helpTip={'This is the amount of money from the user\'s budget that has not yet been assigned to any campaigns. It represents the funds that are still available for the user to allocate to new or existing campaigns.'} />
            <Dash title="Locked" load={getLockedBalanceData} transform={(e) => `$${e}`} helpTip={'This is the amount of money from the user\'s budget that has already been assigned to active campaigns. It represents the funds that are currently being used to promote the user\'s campaigns and cannot be re-allocated to other campaigns.'} />
            <Dash title="Profit" load={getProfitBalanceData} transform={(e) => `$${e}`} helpTip={'This is the amount of money that the user has earned from the clicks received on their shared links. It represents the revenue generated from the user\'s campaigns and is available for withdrawal.'} />
            <Dash title="Payout" load={getPayoutBalanceData} transform={(e) => `$${e}`} helpTip={'This is the total amount of money that the user has withdrawn from their profit. It represents the amount of money that has been transferred to the user\'s account as a result of their campaigns\' success.'} />
        </div>
        <DynamicTable title='Transactions' defaultAction={(e: any) => navigation(`/balance/detail/${e.id}`)} columns={Columns} loading={loading}
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