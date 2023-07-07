import { faBtc, faCcMastercard, faCcVisa, faPaypal, faStripe } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { createDepositBTCLink, getBillingData } from "../../services";
import * as yup from "yup";
import GenericForm, { FormItem } from "../../components/GenericForm";
import SelectCombo from "../../components/SelectCombo";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import useVisit from "../../hooks/Visit";
import { gTag } from "../../firebase";
import { IOption } from "../../interfaces/Common";
import Spinner from "../../components/Spinner";
import { IPaymentMethod } from "../../interfaces/ViewModels";

const balanceIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>

const optionsAmounts = [
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

    const [loading, setLoading] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [payType, setPayType] = useState('');
    const [amount, setAmount] = useState('');
    const [islocked, setIslocked] = useState(false);
    const [options, setOptions] = useState(optionsInitials);
    const [amounts, setAmounts] = useState(optionsAmounts);
    const [data, setData] = useState<IPaymentMethod[]>();
    const navigation = useNavigate();


    useVisit('visit_deposit');

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
        setLoading('Getting billing data ...');
        getBillingData()
            .then(res => {
                handleData(res.data);
            })
            .finally(() => setLoading(''));
    }, []);

    const OpenLink = (link: string) => window.open(link, "_self");

    const handleBTCDeposit = (amount: string) => {
        setIsLoading(true);
        createDepositBTCLink(amount)
            .then(res => OpenLink(res.data))
            .catch(error => toast.error("Error generating invoice link"))
            .finally(() => setIsLoading(false));
    }

    const onSubmit = (data: any) => {
        setLoading('Preparing deposit ...');
        switch (data.payoutType) {
            case 'bitcoin':
                handleBTCDeposit(data.amount.substring(1));
                gTag('deposit_create', { method: 'BTC', amount: data.amount.substring(1) })
                setLoading('');
                break;
            case 'stripe':
                alert('deposit with stripe');
                setLoading('');
                break;
        }

    }

    let schema = yup.object({
        payoutType: yup.string().trim().required(),
        amount: yup.string().trim().required(),
    }).required();

    return (<section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
        <Breadcrumb levels={[{ icon: balanceIcon, title: 'Balance', link: '/balance' }, { title: 'Deposit', link: '' }]} />
        <GenericForm schema={schema} title="Create deposit" onSubmit={onSubmit} buttonTitle="Deposit" loading={isLoading} >
            <FormItem field="payoutType" helpTip="Payment method">
                {({ setValue }) => (<SelectCombo onChange={(value) => { setValue('payoutType', value); setPayType(value) }} items={options} isDisabled={islocked} />)}
            </FormItem>

            <FormItem field="amount" helpTip="Amount to deposit">
                {({ setValue }) => (<SelectCombo onChange={(value) => { setValue('amount', value); setAmount(value) }} items={amounts} />)}
            </FormItem>

        </GenericForm>
        {loading && <Loader text={loading} />}
    </section>)
}