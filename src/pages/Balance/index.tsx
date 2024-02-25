import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dash from "../../components/Dash";
import DashPrice from "../../components/DashPrice";
import DynamicTable from "../../components/DynamicTable";
import { ITransactionResponse } from "../../interfaces/Responses";
import { getAvailableBalanceData, getBudgetBalanceData,  getPayoutBalanceData, getProfitBalanceData, getTransactions, hasVerifiedStripeAccount, loginLinkStripe } from "../../services";
import { Columns } from "./columns";
import SubscribeWrapper from "../../components/SubscribeWrapper";
import useVisit from "../../hooks/Visit";
import { toast } from "react-toastify";
import { NotificationContext } from "../../hooks/NotificationProvider";
import { IPushNotification } from "../../interfaces/ViewModels";
import { INotificationContext } from "../../interfaces/Common";
import Reloader from "../../components/Reloader";

const externalLink = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>


export default function Index() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasStripe, setHasStripe] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<ITransactionResponse>()
    const navigation = useNavigate();
    const [reload, setReload] = useState(false);

    const {
        notification,
        reducePushNotification
    } = useContext<INotificationContext>(NotificationContext);

    useVisit('visit_balance');

    useEffect(() => {
        reducePushNotification(({ transaction, ...rest }: IPushNotification) => ({ transaction: 0, ...rest }));
        hasVerifiedStripeAccount()
            .then(res => setHasStripe(res.data))
    }, []);

    const handleTransaction = () => {
        setLoading(true);
        getTransactions(page)
            .then((res) => setData(res.data))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setReload(notification.transaction > 0)
    }, [notification.transaction])

    useEffect(() => {
        handleTransaction();
    }, [page, hasStripe]);

    const OpenLink = (link: string) => {
        const newWindow = window.open(link, "_blank");
        if (newWindow) {
            newWindow.onload = () => setLoading(false);
            newWindow.onerror = () => setLoading(false);
            newWindow.onabort = () => setLoading(false);
        }
    }

    const goToDeposit = () => {
        navigation("/deposit");
    }

    const goToStripe = () => {
        setLoading(true);
        loginLinkStripe()
            .then(res => OpenLink(res.data))
            .catch(() => {
                setLoading(false);
                toast.warning("Unable to go to Stripe");
            })
            .finally(() => setLoading(false));
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
            {hasStripe &&
                <button type="button" onClick={() => goToStripe()} className="min-w-[180px] focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">
                    <span className="flex justify-center items-center gap-1">
                        Go to Stripe {externalLink}
                    </span>
                </button>
            }

            <button type="button" onClick={() => goToWithdraw()} className="min-w-[180px] focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">Withdraw</button>

        </div>
        <div className="w-full flex gap-2 flex-wrap justify-between xxs:justify-center items-start">
            {/* <DashPrice title="Budget" load={getBudgetBalanceData} helpTip={'This is the overall amount of money that a user has available to allocate to campaigns. It represents the total funds that the user has for investing in their campaigns.'} /> */}
            <DashPrice title="Available" load={getAvailableBalanceData} helpTip={'This is the amount of money from the user\'s budget that has not yet been assigned to any campaigns. It represents the funds that are still available for the user to allocate to new or existing campaigns.'} />
            {/* <DashPrice title="Locked" load={getLockedBalanceData} helpTip={'This is the amount of money from the user\'s budget that has already been assigned to active campaigns. It represents the funds that are currently being used to promote the user\'s campaigns and cannot be re-allocated to other campaigns.'} /> */}
            <DashPrice title="Profit" load={getProfitBalanceData} helpTip={'This is the amount of money that the user has earned from the clicks received on their shared links. It represents the revenue generated from the user\'s campaigns and is available for withdrawal.'} />
            {/* <DashPrice title="Payout" load={getPayoutBalanceData} helpTip={'This is the total amount of money that the user has withdrawn from their profit. It represents the amount of money that has been transferred to the user\'s account as a result of their campaigns\' success.'} /> */}
        </div>
        <DynamicTable title='Transactions' defaultAction={(e: any) => navigation(`/balance/detail/${e.id}`)} columns={Columns} loading={loading}
            pagination={
                {
                    first: () => setPage(1),
                    last: () => setPage(data?.pagination.totalPages.valueOf() || 1),
                    next: () => setPage(prev => prev + 1),
                    prev: () => setPage(prev => prev - 1),
                    ...(data?.pagination!),
                }
            }
            rows={data?.items || []} />
            <Reloader callback={() => handleTransaction()} isVisible={reload} />
    </section>)
}