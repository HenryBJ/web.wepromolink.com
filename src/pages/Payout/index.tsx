import Breadcrumb from "../../components/Breadcrumb"
import GenericForm, { FormItem } from "../../components/GenericForm";
import { IPayoutData } from "../../interfaces/ViewModels";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import SelectCombo from "../../components/SelectCombo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBtc, faCcMastercard, faCcVisa, faPaypal, faStripe } from "@fortawesome/free-brands-svg-icons";
import { GetPayoutData, UpdatePayout } from "../../services/PayoutService";


const billingIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>


const optionsInitials = [
    { id: 1, name: 'Bitcoin', icon: <FontAwesomeIcon icon={faBtc} className="text-xl text-yellow-500" />, selected: true },
    { id: 2, name: 'Paypal', icon: <FontAwesomeIcon icon={faPaypal} className="text-xl text-blue-600" />, selected: false },
    { id: 3, name: 'Stripe', icon: <FontAwesomeIcon icon={faStripe} className="text-xl text-blue-600" />, selected: false },
    { id: 4, name: 'Mastercard', icon: <FontAwesomeIcon icon={faCcMastercard} className="text-xl text-red-600" />, selected: false },
    { id: 5, name: 'Visa', icon: <FontAwesomeIcon icon={faCcVisa} className="text-xl text-blue-600" />, selected: false },
    {
        id: 6, name: 'Wire', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-orange-500 group-hover:text-white w-5 h-5 text-orange-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>, selected: false
    }
]


export default function Index() {

    const [loading, setLoading] = useState('');
    const [payType, setPayType] = useState('');
    const [islocked, setIslocked] = useState(false);
    const [data, setData] = useState<IPayoutData>();
    const [options, setOptions] = useState(optionsInitials);
    const navigation = useNavigate();

    const handleOptions = (payoutType: string) => {

        setOptions(prev => {
            return prev.map(e => {
                let k = { ...e }
                k.selected = e.name.toLocaleLowerCase() === payoutType
                return k;
            })
        });
    }

    useEffect(() => {
        setLoading('Getting payout data ...');
        GetPayoutData()
            .then(res => {
                setData(res.data);
                setPayType(res.data.payoutType);
                setIslocked(res.data.isLockedPayoutType);
                handleOptions(res.data.payoutType);
            })
            .finally(() => setLoading(''));
    }, []);

    const onSubmit = (data: IPayoutData) => {
        setLoading('Updating payout data ...');

        console.log(data);
        UpdatePayout(data)
            .then(res => navigation(-1))
            .catch(error => console.log(error))
            .finally(() => setLoading(''));

    }

    let schema = yup.object({
        payoutType: yup.string().trim().required(),
        btcAddress: yup.string().when('payoutType', {
            is: (val: string) => val === 'bitcoin',
            then: yup.string().required('Bitcoin address is required'),
            otherwise: yup.string()
        }),
        debitCard: yup.string().when('payoutType', {
            is: (val: string) => (val === 'visa' || val === 'mastercard'),
            then: yup.string().required('Debit card is required'),
            otherwise: yup.string()
        }),
        paypal: yup.string().when('payoutType', {
            is: (val: string) => val === 'paypal',
            then: yup.string().required('Paypal email is required'),
            otherwise: yup.string()
        }),
        stripe: yup.string().when('payoutType', {
            is: (val: string) => val === 'stripe',
            then: yup.string().required('Stripe Account Id is required'),
            otherwise: yup.string()
        }),
        wireName: yup.string().when('payoutType', {
            is: (val: string) => val === 'wire',
            then: yup.string().required('Beneficiary is required'),
            otherwise: yup.string()
        }),
        wireBankName: yup.string().when('payoutType', {
            is: (val: string) => val === 'wire',
            then: yup.string().required('Bank Name is required'),
            otherwise: yup.string()
        }),
        wireSwiftorBic: yup.string(),
        wireIban: yup.string(),
        wireBankAddress: yup.string().when('payoutType', {
            is: (val: string) => val === 'wire',
            then: yup.string().required('Bank Address is required'),
            otherwise: yup.string()
        }),
        wireBranch: yup.string(),
        wireRouting: yup.string(),
    }).required();

    return (<section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
        <Breadcrumb levels={[{ icon: billingIcon, title: 'Payout', link: '/payouts' }, { title: 'Payout Data', link: '' }]} />
        <GenericForm schema={schema} title="Payout Info" onSubmit={onSubmit} buttonTitle="Update" back={false} >
            <FormItem field="payoutType" helpTip="Payment method">
                {({ setValue }) => (<SelectCombo onChange={(value) => { setValue('payoutType', value); setPayType(value) }} items={options} isDisabled={islocked} />)}
            </FormItem>

            {payType === 'bitcoin' ? <FormItem field="btcAddress" helpTip="Bitcoin Address">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Bitcoin Address" type="text" {...register("btcAddress")} />)}
            </FormItem> : []}

            {(payType === 'visa' || payType === 'mastercard') ? <FormItem field="debitCard" helpTip="Debit card number">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Debit card number" type="text" {...register("debitCard")} />)}
            </FormItem> : []}

            {payType === 'paypal' ? <FormItem field="paypal" helpTip="Paypal Email">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Paypal Email" type="text" {...register("paypal")} />)}
            </FormItem> : []}

            {payType === 'stripe' ? <FormItem field="stripe" helpTip="Stripe Account Id">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Stripe Account Id" type="text" {...register("stripe")} />)}
            </FormItem> : []}

            {payType === 'wire' ? <FormItem field="wireName" helpTip="Beneficiary">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Beneficiary Name" type="text" {...register("wireName")} />)}
            </FormItem> : []}

            {payType === 'wire' ? <FormItem field="wireIban" helpTip="IBAN">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="IBAN" type="text" {...register("wireIban")} />)}
            </FormItem> : []}

            {payType === 'wire' ? <FormItem field="wireSwiftorBic" helpTip="SWIFT or BIC is a unique code used to identify a specific bank in international transactions, such as wire transfers.">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="SWIFT or BIC" type="text" {...register("wireSwiftorBic")} />)}
            </FormItem> : []}

            {payType === 'wire' ? <FormItem field="wireRouting" helpTip="The routing number is a 9-digit code used to identify US financial institutions in electronic transactions, such as wire transfers and direct deposits">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Routing number" type="text" {...register("wireRouting")} />)}
            </FormItem> : []}

            {payType === 'wire' ? <FormItem field="wireBankName" helpTip="Bank Name">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Bank Name" type="text" {...register("wireBankName")} />)}
            </FormItem> : []}


            {payType === 'wire' ? <FormItem field="wireBankAddress" helpTip="The bank address is the physical location where a bank is located.">
                {({ register }) => (<textarea className="h-28 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none" maxLength={500} placeholder="Bank Address" {...register("wireBankAddress")} />)}
            </FormItem> : []}

            {payType === 'wire' ? <FormItem field="wireBranch" helpTip="The branch is a specific location of a bank where transactions are conducted, such as opening accounts, making deposits, and withdrawals.">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Branch" type="text" {...register("wireBranch")} />)}
            </FormItem> : []}



        </GenericForm>
        {loading && <Loader text={loading} />}
    </section>)
}