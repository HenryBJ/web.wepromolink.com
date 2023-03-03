import Breadcrumb from "../../components/Breadcrumb"
import GenericForm, { FormItem } from "../../components/GenericForm";
import { IPayoutData } from "../../interfaces/ViewModels";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";
import SelectCombo from "../../components/SelectCombo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBtc } from "@fortawesome/free-brands-svg-icons";


const billingIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>



const schema = yup.object({
    payoutType: yup.string().trim().required(),
    btcAddress: yup.string(),
    debitCard: yup.string(),
    paypal: yup.string(),
    wire: yup.object({
        name: yup.string().required(),
        accountNumber: yup.string().required(),
        bankName: yup.string().required(),
        swiftorBic: yup.string(),
        iban: yup.string(),
        bankAddress: yup.string().required(),
        branch: yup.string()
    }),
}).required();

export default function Index() {

    const [loading, setLoading] = useState(false);    
    const navigation = useNavigate();

    const onSubmit = (data: IPayoutData) => {
        setLoading(true);

        alert('demo');
        // UdpateBillingData(data)
        //     .then(res => navigation(-1))
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false));

    }


    return (<section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
        <Breadcrumb levels={[{ icon: billingIcon, title: 'Payout', link: '/payouts' }, { title: 'Payout Data', link: '' }]} />
        <GenericForm schema={schema} title="Payout Info" onSubmit={onSubmit} buttonTitle="Update" back={false} >
                <FormItem field="payoutType" helpTip="Payout Type">
                    {({ register }) => (<SelectCombo items={[
                        {id:1,name:'Bitcoin',icon:<FontAwesomeIcon icon={faBtc} className="text-xl text-yellow-500" />}
                        ]}  />) }
                </FormItem>

                <FormItem field="description" helpTip="Campaign description">
                    {({ register }) => (<textarea className="h-28 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none" maxLength={500} placeholder="Description" {...register("description")} />)}
                </FormItem>

                <FormItem field="url" helpTip="Campaign URL">
                    {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="URL" type="text" {...register("url")} />)}
                </FormItem>

                <FormItem helpTip="CPM: Cost per mile, This is the cost for 1000 clicks range (10-1000)">
                    {({ register }) => (<input max={1000} min={10} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={60} placeholder="Cost per mile (CPM)" type="number" {...register("epm")} />)}
                </FormItem>

                <FormItem field="imageUrl" helpTip="Campaign Image URL">
                    {({ register }) => (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={120} placeholder="Image URL" type="text" {...register("imageUrl")} />)}
                </FormItem>
                
            </GenericForm>
            {loading && <Loader text="Updating payout data ..." />}
    </section>)
}