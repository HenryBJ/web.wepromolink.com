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
import { connectStripe, getBillingData, verifyBTCAddress } from "../../services";
import useVisit from "../../hooks/Visit";
import AccountVerified from "../../components/AccountVerified";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { IOption } from "../../interfaces/Common";


const billingIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>




const optionsInitials: IOption[] = [
    // { id: 1, name: 'Bitcoin', icon: <FontAwesomeIcon icon={faBtc} className="text-xl text-yellow-500" />, selected: true },
    // { id: 3, name: 'Stripe', icon: <FontAwesomeIcon icon={faStripe} className="text-xl text-blue-600" />, selected: false },
    { id: 1, name: '', icon: <Spinner />, selected: true },
]


export default function Index() {

    const [loading, setLoading] = useState('');
    const [data, setData] = useState<IPaymentMethod[]>();
    const [options, setOptions] = useState<IOption[]>(optionsInitials);
    const [method, setMethod] = useState('');
    const [btcAddress, setBtcAddress] = useState('');
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const navigation = useNavigate();



    useVisit('visit_billing');

    const handleChange = (newMethod: string) => {
        setMethod(newMethod);
        let isV = data?.find(e => e.name.toLowerCase() === newMethod)?.isVerified;
        setIsVerified(isV ?? false);
    }

    const getButtonName = (): string => {
        if (method === "stripe") {
            if (isVerified) {
                return "Update Stripe"
            } else {
                return "Connect with Stripe"
            }
        }
        if (method === "bitcoin" && !isVerified) return "Validate Address";
        return "Back";

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
        setBtcAddress(data?.find(e => e.name.toLowerCase() === 'bitcoin')?.value ?? "");
    }

    useEffect(() => {
        setLoading('Getting billing data ...');
        getBillingData()
            .then(res => {
                handleData(res.data);
            })
            .finally(() => setLoading(''));
    }, []);

    const OpenLink = (link: string) => {
        const newWindow = window.open(link, "_self");
        if (newWindow) {
            newWindow.onload = () => setLoading("");
            newWindow.onerror = () => setLoading("");
            newWindow.onabort = () => setLoading("");
        }
    }

    const handleChangeBTCAddress = (address: string) => {
        // If it is the same address set the same verification state
        if (address === data?.find(e => e.name.toLowerCase() === "bitcoin")?.value) {
            setIsVerified(data?.find(e => e.name.toLowerCase() === "bitcoin")?.isVerified ?? false);
        } else {
            setIsVerified(false);
        }
        setBtcAddress(address);
    }

    const handleOnValidateAddress = (data: IPaymentMethod) => {
        console.log('handleOnValidateAddress');
        setLoading("Validating Bitcoin Address");
        verifyBTCAddress(data.value ?? "")
            .then(res => {
                if (res.data) {
                    setIsVerified(true);
                    setData(prev => prev?.map(item => {
                        if (item.name.toLowerCase() === 'bitcoin') {
                            return { ...item, value: data.value, isVerified: true }
                        }
                        return item;
                    }));
                    toast.success("Bitcoin Address is Valid, your Bitcoin Billing Information is verified now");
                } else {
                    toast.warning("Bitcoin Address is NOT Valid");
                }
            })
            .finally(() => setLoading(""));
    }

    const handleOnUpdateStripe = (data: IPaymentMethod) => {
        setLoading("Updating Stripe")
        connectStripe()
            .then(res => OpenLink(res.data))
            .catch(_ => {
                toast.warning("Unable to connect to Stripe");
                setLoading("");
            })
    }

    const handleOnUpdateBTC = (data: IPaymentMethod) => {
        navigation(-1);
    }

    const handleOnConnectStripe = (data: IPaymentMethod) => {
        setLoading("Connecting to Stripe")
        connectStripe()
            .then(res => OpenLink(res.data))
            .catch(_ => {
                toast.warning("Unable to connect to Stripe");
                setLoading("");
            })
    }

    const onSubmit = (): (data: IPaymentMethod) => void => {
        console.log('onSubmit');
        if (method === "stripe") {
            if (isVerified) {
                return (data: IPaymentMethod) => handleOnUpdateStripe(data);
            } else {
                return (data: IPaymentMethod) => handleOnConnectStripe(data);
            }
        } else if (method === "bitcoin") {
            if (isVerified) {
                return (data: IPaymentMethod) => handleOnUpdateBTC(data);
            } else {
                return (data: IPaymentMethod) => handleOnValidateAddress(data);
            }
        }
        return (d) => console.log(d);
    }

    let schema = yup.object({
        name: yup.string().trim().required(),
        value: yup.string().when('name', {
            is: (val: string) => val === 'bitcoin',
            then: yup.string().matches(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/, 'The Bitcoin address is invalid').required('Bitcoin address is required'),
            otherwise: yup.string()
        }),
        isVerified: yup.bool(),

    }).required();

    return (<section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
        <Breadcrumb levels={[{ icon: billingIcon, title: 'Billing', link: '/billing' }, { title: 'Billing Information', link: '' }]} />
        <GenericForm
            schema={schema}
            title="Billing Information"
            onSubmit={onSubmit()}
            buttonTitle={getButtonName()}
            back={true}
            initialValue={data} >
            <FormItem field="name" helpTip="Payment method">
                {({ setValue }) => (<SelectCombo onChange={(value) => { setValue('name', value); handleChange(value); }} items={options} />)}
            </FormItem>

            <FormItem field="isVerified">
                {() => {
                    if (loading) {
                        return <Spinner />
                    }
                    return <AccountVerified isVerified={isVerified} extra={method === "bitcoin" ?
                        "You must provide a valid, owned, and previously used Bitcoin address for it to be validated."
                        : "Click on the button to create a connected Stripe account and proceed with the validation."} />
                }}

            </FormItem>

            {method === 'bitcoin' ? <FormItem field="value" helpTip="Bitcoin Address">
                {({ setValue }) => (<input value={btcAddress} onChange={(value) => { setValue('value', value.target.value); handleChangeBTCAddress(value.target.value); }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Bitcoin Address" type="text" />)}
            </FormItem> : []}

        </GenericForm>
        {loading && <Loader text={loading} />}
    </section>)
}