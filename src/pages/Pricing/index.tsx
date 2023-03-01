import { useState } from "react";

export default function Pricing() {

  const [proMonthly, setProMonthly] = useState(true);
  const [busiMonthly, setBusiMonthly] = useState(true);

  return (

    <div className="container max-w-4xl mx-auto z-50 pt-12 md:pt-0 md:mt-5">
      <h1 className="font-bold text-3xl text-center text-orange-100 md:text-orange-800 mb-4">Pricing</h1>

      <div className=" h-full w-full flex flex-wrap gap-3">
        <div className="bg-white/60 h-96 w-72 rounded-md shadow-2xl flex flex-col p-3">
          <div className="w-full text-center text-orange-800 text-2xl">Community</div>
          <div className="w-full text-center text-orange-800 text-xl mt-2">$0/mo</div>
          <table className="w-full mt-10 table">
            <tr>
              <td className="w-9/10 text-orange-800">Deposit fee</td>
              <td className="w-1/10 text-right text-orange-800">5%</td>
            </tr>
            <tr>
              <td className="w-9/10 text-orange-800">Payout fee</td>
              <td className="w-1/10 text-right text-orange-800">5%</td>
            </tr>
            <tr>
              <td className="w-9/10 text-orange-800">Payment method</td>
              <td className="w-1/10 text-right text-orange-800">Bitcoin</td>
            </tr>
            <tr>
              <td className="w-9/10 text-orange-800">Payout minimun</td>
              <td className="w-1/10 text-right text-orange-800">$100</td>
            </tr>
          </table>

        </div>

        <div className="relative overflow-clip">
          <div className="bg-white/60 h-96 w-72 rounded-md shadow-2xl flex flex-col p-3">
            <div className="w-full text-center text-orange-800 text-2xl">Professional</div>

            {proMonthly ?
              <div className="w-full text-center text-orange-800 text-xl mt-2">$4.99/mo</div>
              :
              <div className="relative mt-2">
                <div className="w-full text-center text-orange-800 text-xl">$54.89/year</div>
                <span className="absolute -bottom-2 right-12 text-white rounded text-[9px] bg-orange-500 font-bold px-1">8.34% off</span>
              </div>
            }

            <div className="w-full flex justify-around mt-3">
              <span className={proMonthly ? 'text-orange-500 font-bold' : ' text-gray-400'}>Monthly</span>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch" onChange={() => setProMonthly(!proMonthly)} />
              <span className={!proMonthly ? 'text-orange-500 font-bold' : ' text-gray-400'}>Annually</span>
            </div>

            <table className="w-full mt-1 table">
              <tr>
                <td className="w-9/10 text-orange-800">Deposit fee</td>
                <td className="w-1/10 text-right text-orange-800">0%</td>
              </tr>
              <tr>
                <td className="w-9/10 text-orange-800">Payout fee</td>
                <td className="w-1/10 text-right text-orange-800">0%</td>
              </tr>
              <tr>
                <td className="w-9/10 text-orange-800">Payment method</td>
                <td className="w-1/10 text-right text-orange-800">Visa, Mastercard, Stripe</td>
              </tr>
              <tr>
                <td className="w-9/10 text-orange-800">Payout minimun</td>
                <td className="w-1/10 text-right text-orange-800">$50</td>
              </tr>
            </table>

          </div>
          <span className="absolute top-5 -right-8 bg-orange-500 py-0 px-10 text-white text-md font-semibold rotate-45">Popular</span>
        </div>


        <div className="bg-white/60 h-96 w-72 rounded-md shadow-2xl flex flex-col p-3">
          <div className="w-full text-center text-orange-800 text-2xl">Bussiness</div>
          {busiMonthly ?
            <div className="w-full text-center text-orange-800 text-xl mt-2">$14.99/mo</div>
            :
            <div className="relative mt-2">
              <div className="w-full text-center text-orange-800 text-xl">$149.90/year</div>
              <span className="absolute -bottom-2 right-12 text-white rounded text-[9px] bg-orange-500 font-bold px-1">16.67% off</span>
            </div>
          }

          <div className="w-full flex justify-around mt-3">
            <span className={busiMonthly ? 'text-orange-500 font-bold' : ' text-gray-400'}>Monthly</span>
            <input
              className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
              type="checkbox"
              role="switch" onChange={() => setBusiMonthly(!busiMonthly)} />
            <span className={!busiMonthly ? 'text-orange-500 font-bold' : ' text-gray-400'}>Annually</span>
          </div>

          <table className="w-full mt-1 table">
            <tr>
              <td className="w-9/10 text-orange-800">Deposit fee</td>
              <td className="w-1/10 text-right text-orange-800">0%</td>
            </tr>
            <tr>
              <td className="w-9/10 text-orange-800">Payout fee</td>
              <td className="w-1/10 text-right text-orange-800">0%</td>
            </tr>
            <tr>
              <td className="w-9/10 text-orange-800">Payment method</td>
              <td className="w-1/10 text-right text-orange-800">Visa, Mastercard, Stripe</td>
            </tr>
            <tr>
              <td className="w-9/10 text-orange-800">Payout minimun</td>
              <td className="w-1/10 text-right text-orange-800">$50</td>
            </tr>
          </table>
        </div>


      </div>




    </div>
  )
}