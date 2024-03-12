import { faBtc, faCcMastercard, faCcVisa, faPaypal, faStripe } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { createWithDrawBTC, createWithDrawStripe, getBillingData, getProfitBalanceData, getWithdrawFee } from "../../services";
import * as yup from "yup";
import GenericForm, { FormItem } from "../../components/GenericForm";
import SelectCombo from "../../components/SelectCombo";
import Loader from "../../components/Loader";
import { getAvailableBalanceData } from "../../services";
import useVisit from "../../hooks/Visit";
import { gTag } from "../../firebase";
import { IOption } from "../../interfaces/Common";
import Spinner from "../../components/Spinner";
import { IPaymentMethod } from "../../interfaces/ViewModels";
import { toast } from "react-toastify";

const balanceIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>

const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} fill="currentColor" className="w-6 h-6 text-blue-600">
<path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
</svg>


const optionsAmounts: IOption[] = [
    { id: 1, name: '$50', selected: true },
    { id: 2, name: '$100', selected: false },
    { id: 3, name: '$150', selected: false },
    { id: 4, name: '$200', selected: false },
    { id: 5, name: '$500', selected: false },
]


const optionsInitials: IOption[] = [
    { id: 1, name: '', icon: <Spinner />, selected: true },
]


export default function Index() {

    const [withdrawfee, setWithdraw] = useState(0);
    const [loading, setLoading] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [payType, setPayType] = useState('');
    const [amount, setAmount] = useState('');
    const [profit, setProfit] = useState(0);
    const [options, setOptions] = useState(optionsInitials);
    const [amounts, setAmounts] = useState(optionsAmounts);
    const [data, setData] = useState<IPaymentMethod[]>();
    const navigation = useNavigate();

    useVisit('visit_withdraw');

    const handleData = (data: IPaymentMethod[]) => {
        let list: IOption[] = data.map((e: IPaymentMethod, i): IOption =>
        ({
            id: i,
            name: e.name.toLowerCase(),
            selected: i === 0,
            icon: e.name.toLowerCase() === 'bitcoin' ? <FontAwesomeIcon icon={faBtc} className="text-xl text-yellow-500" /> : <FontAwesomeIcon icon={faStripe} className="text-xl text-blue-600" />
        }));
        setOptions(list);
        setData(data);
    }

    useEffect(() => {
        getProfitBalanceData()
            .then(res => {
                setProfit(res.data.valueOf());
            });
    }, []);

    useEffect(()=>{
        getWithdrawFee().then(res=>setWithdraw(res.data));
    },[])

    useEffect(() => {
        setLoading('Getting withdraw method ...');
        getBillingData()
            .then(res => {
                handleData(res.data);
            })
            .finally(() => setLoading(''));
    }, []);


    const onSubmit = async (newdata: any) => {

        const isVerified = data?.find(e => e.name.toLowerCase() === newdata.payoutType)?.isVerified;
        const moneyAmount: number = Number(newdata.amount.substring(1));

        if (!isVerified) {
            toast.warning("Your billing information is not verified, It is mandatory for make withdraws");
            return;
        }

        if (moneyAmount > profit) {
            toast.warning("Insufficient profit to make withdraws");
            return;
        }

        setIsLoading(true);
        setLoading('Preparing withdraw ...');

        try {
            switch (newdata.payoutType) {
                case 'bitcoin':
                    gTag('withdraw_create', { method: 'BTC', amount: newdata.amount.substring(1) });
                    await createWithDrawBTC(moneyAmount);
                    
                    toast.success('Withdraw requested sucessfully');
                    navigation('/balance');
                    break;
                case 'stripe':
                    gTag('withdraw_create', { method: 'Stripe', amount: newdata.amount.substring(1) });
                    await createWithDrawStripe(moneyAmount);
                    setLoading('');
                    toast.success('Withdraw requested sucessfully');
                    navigation('/balance');
                    break;
            }

        } catch (error) {
            toast.error('Something goes wrong !!!');
        }
        finally{
            setLoading('');
            setIsLoading(false);
        }

    }

    const calcAmount = ()=>{
        let n = Number(amount.substring(1));
        let percentRate = (100-withdrawfee)/100;        
        return `$${percentRate*n}`;
    }

    let schema = yup.object({
        payoutType: yup.string().trim().required(),
        amount: yup.string().trim().required(),
    }).required();

    return (<section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
        <Breadcrumb levels={[{ icon: balanceIcon, title: 'Balance', link: '/balance' }, { title: 'Withdraw', link: '' }]} />
        <GenericForm schema={schema} title="Create withdraw request" onSubmit={onSubmit} buttonTitle="Withdraw" requiredSubscription={false} loading={isLoading} >
            <FormItem>
                <div className="min-h-[35px] bg-white shadow px-2 py-2 flex-grow flex gap-1">
                    <span className="font-semibold text-gray-800">Profit</span>
                    <span>{`$${profit}`}</span>
                </div>
            </FormItem>
            <FormItem field="payoutType" helpTip="Payment method">
                {({ setValue }) => (<SelectCombo onChange={(value) => { setValue('payoutType', value); setPayType(value) }} items={options} />)}
            </FormItem>

            <FormItem field="amount" helpTip="Amount to withdraw">
                {({ setValue }) => (<SelectCombo onChange={(value) => { setValue('amount', value); setAmount(value) }} items={amounts} />)}
            </FormItem>

            {withdrawfee ? <FormItem>
                <div className="flex flex-col mx-2">
            <div className="flex items-center gap-2">
                <span>{infoIcon}</span>
                <div>
                    <b className="text-black/90">Withdraw fee</b>
                </div>
            </div>
            <div className="mx-8 text-gray-700">
            Your subscription plan requires a withdraw fee of <b>{withdrawfee}%</b> resulting in a transfer of <b>{calcAmount()}</b> to your Stripe Connect account.
            </div>
        </div>
            </FormItem>:[]}

        </GenericForm>
        {loading && <Loader text={loading} />}
    </section>)
}