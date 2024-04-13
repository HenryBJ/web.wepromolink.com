import { useState } from "react";
import { faBtc, faCcMastercard, faCcVisa, faPaypal, faStripe } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISubFeature } from "../../interfaces/ViewModels";
import Spinner, { SpinnerType } from "../Spinner";


interface IProps {
    id: string,
    title: string,
    monthly: number,
    annually: number,
    discount: number,
    tag?: string,
    loading: boolean,
    paymentmethod: string,
    monthlyPriceId: string,
    annualyPriceId?: string,
    disabled:boolean,
    upgradeable:boolean,
    features?: ISubFeature[]
    onGetStarted: (link?: string, Id?: string) => void

}

const checkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>

const NoIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>





export default function Index({ id, title, monthly, annually, discount, features, tag, loading, paymentmethod, onGetStarted, monthlyPriceId, annualyPriceId, disabled, upgradeable }: IProps) {

    const [proMonthly, setProMonthly] = useState(true);

    return (
        <div className="relative overflow-clip shadow-2xl h-96 rounded-md ">
            <div className="absolute bottom-0 left-0 w-full px-4">
                {!disabled && <button 
                disabled={loading} 
                onClick={() => onGetStarted(proMonthly ? monthlyPriceId : annualyPriceId, id)} 
                className={loading ? "w-full hover:bg-orange-300 cursor-pointer  bg-orange-300 text-white font-sans font-bold text-center text-base px-4 py-1 mx-auto my-4 rounded-full shadow-xl" : "w-full hover:bg-orange-700 cursor-pointer  bg-orange-500 text-white font-sans font-bold text-center text-base px-4 py-1 mx-auto my-4 rounded-full shadow-xl hover:shadow-none active:bg-white active:text-orange-500 active:ring-2 active:ring-orange-500 disabled:bg-orange-950"}>
                    <div className="flex justify-center">
                        {loading && <Spinner text="" />}
                        {upgradeable? 'Upgrade':'Get Started'}
                    </div>
                </button>}
            </div>
            <div className="bg-gray-100 md:bg-white/60 h-96 w-72 rounded-md flex flex-col p-3">
                <div className="w-full text-center text-orange-800 text-2xl">{title}</div>

                {proMonthly ?
                    <div className="w-full text-center text-orange-800 text-xl mt-2">{`$${monthly}/mo`}</div>
                    :
                    <div className="relative mt-2">
                        <div className="w-full text-center text-orange-800 text-xl">{`$${annually}/year`}</div>
                        {discount !== 0 && <span className="absolute -bottom-3 right-12 text-white rounded text-xs bg-orange-500 font-bold px-1">{`${discount}% off`}</span>}
                    </div>
                }

                {(monthly !== 0 && annually !== 0) ? <div className="w-full flex justify-around mt-3">
                    <span className={proMonthly ? 'text-orange-500 font-bold' : ' text-gray-400'}>Monthly</span>
                    <input
                        className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                        type="checkbox"
                        role="switch" onChange={() => setProMonthly(!proMonthly)} />
                    <span className={!proMonthly ? 'text-orange-500 font-bold' : ' text-gray-400'}>Annually</span>
                </div> : <div className="mt-9"></div>}

                <table className="w-full mt-1 table">
                    <tr>
                        <td className="w-9/10 text-orange-800">Payment method</td>
                        <td className="w-1/10 flex justify-end text-orange-800">
                            <div className="flex gap-1">
                                {paymentmethod.includes('visa') && <FontAwesomeIcon icon={faCcVisa} className="text-xl text-blue-600" />}
                                {paymentmethod.includes('mastercard') && <FontAwesomeIcon icon={faCcMastercard} className="text-xl text-red-600" />}
                                {paymentmethod.includes('stripe') && <FontAwesomeIcon icon={faStripe} className="text-3xl text-blue-600" />}
                                {paymentmethod.includes('bitcoin') && <FontAwesomeIcon icon={faBtc} className="text-xl text-yellow-500" />}
                                {paymentmethod.includes('paypal') && <FontAwesomeIcon icon={faPaypal} className="text-xl text-blue-600" />}
                                {paymentmethod.includes('wire transfer') && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                                </svg>
                                }
                            </div>

                        </td>
                    </tr>
                    
                    {features?.sort((a, b) => a.order-b.order).map((e: ISubFeature) =>
                    (<tr>
                        <td className="w-9/10 text-orange-800">{e.name}</td>
                        <td className="w-1/10 text-right text-orange-800  flex justify-end">
                            {e.commingSoon? 
                            <div className=" relative text-left  w-full">
                                <span className="flex justify-center  rounded-3xl  bg-orange-500 text-white text-xs absolute top-0 -left-10 w-20">coming soon</span>
                            </div>: 
                            e.value ? e.value : (e.boolValue ? checkIcon : NoIcon)}</td>
                    </tr>)
                    )}

                </table>

            </div>
            {tag && <span className="absolute top-5 -right-8 bg-orange-500 py-0 px-10 text-white text-md font-semibold shadow-md rotate-45">{tag}</span>}
        </div>
    )
}