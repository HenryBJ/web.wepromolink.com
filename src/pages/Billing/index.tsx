import Breadcrumb from "../../components/Breadcrumb"
import GenericForm, { FormItem } from "../../components/GenericForm";
import { IPaymentMethod } from "../../interfaces/ViewModels";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import SelectCombo from "../../components/SelectCombo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBtc, faCcMastercard, faCcVisa, faPaypal, faStripe } from "@fortawesome/free-brands-svg-icons";
import { getBillingData, updatePayout } from "../../services";
import useVisit from "../../hooks/Visit";
import AccountVerified from "../../components/AccountVerified";


const billingIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>

interface IOption {
    id: number,
    name: string,
    icon?: ReactElement,
    selected: boolean,
}


const optionsInitials: IOption[] = [
    { id: 1, name: 'Bitcoin', icon: <FontAwesomeIcon icon={faBtc} className="text-xl text-yellow-500" />, selected: true },
    { id: 3, name: 'Stripe', icon: <FontAwesomeIcon icon={faStripe} className="text-xl text-blue-600" />, selected: false },
]


export default function Index() {

    const [loading, setLoading] = useState('');
    const [data, setData] = useState<IPaymentMethod[]>();
    const [options, setOptions] = useState<IOption[]>(optionsInitials);
    const [method, setMethod] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const navigation = useNavigate();



    useVisit('visit_billing');

    const handleChange = (newMethod: string) => {
        setMethod(newMethod);
        let isV = data?.find(e => e.name.toLowerCase() === newMethod)?.isVerified;
        setIsVerified(isV ?? false);
    }

    const handleData = (data: IPaymentMethod[]) => {
        let list: IOption[] = data.map((e: IPaymentMethod, i): IOption =>
        ({
            id: i,
            name: e.name.toLowerCase(),
            selected: i === 0,
            icon: e.name.toLowerCase() === 'bitcoin' ? <FontAwesomeIcon icon={faBtc} className="text-xl text-yellow-500" /> : <FontAwesomeIcon icon={faStripe} className="text-xl text-blue-600" />
        }));

        console.log(list);
        setMethod(list[0].name);
        setOptions(list);
        setData(data);
        setIsVerified(data[0].isVerified);
    }

    useEffect(() => {
        setLoading('Getting billing data ...');
        getBillingData()
            .then(res => {
                // console.log(res.data);
                handleData(res.data);
            })
            .finally(() => setLoading(''));
    }, []);

    const onSubmit = (data: IPaymentMethod) => {
        setLoading('Updating billing data ...');

        console.log(data);
        // updatePayout(data)
        //     .then(res => navigation(-1))
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(''));

    }

    let schema = yup.object({
        name: yup.string().trim().required(),
        value: yup.string().when('name', {
            is: (val: string) => val === 'Bitcoin',
            then: yup.string().matches(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/, 'The Bitcoin address is invalid').required('Bitcoin address is required'),
            otherwise: yup.string()
        }),
        isVerified: yup.bool(),

    }).required();

    return (<section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
        <Breadcrumb levels={[{ icon: billingIcon, title: 'Billing', link: '/billing' }, { title: 'Billing Information', link: '' }]} />
        <GenericForm schema={schema} title="Billing Information" onSubmit={onSubmit} buttonTitle="Update" back={false} initialValue={data} >
            <FormItem field="name" helpTip="Payment method">
                {({ setValue }) => (<SelectCombo onChange={(value) => { setValue('name', value); handleChange(value); }} items={options} />)}
            </FormItem>

            <FormItem field="isVerified">
                <AccountVerified isVerified={isVerified} extra={method === "bitcoin" ?
                    "You must provide a valid, owned, and previously used Bitcoin address for it to be validated."
                    : "Click on the button to create a connected Stripe account and proceed with the validation."} />
            </FormItem>

            {method === 'bitcoin' ? <FormItem field="value" helpTip="Bitcoin Address">
                {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Bitcoin Address" type="text" {...register("value")} />)}
            </FormItem> : []}

        </GenericForm>
        {loading && <Loader text={loading} />}
    </section>)
}