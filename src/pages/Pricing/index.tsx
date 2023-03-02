import { useState } from "react";
import SubcriptionCard from "../../components/SubcriptionCard";

export default function Pricing() {

  const [proMonthly, setProMonthly] = useState(true);
  const [busiMonthly, setBusiMonthly] = useState(true);

  const onGetStarted = (monthly:boolean)=>{
    alert(monthly)
  }

  return (

    <div className="container max-w-4xl mx-auto z-50 pt-12 md:pt-0 md:mt-5">
      <h1 className="font-bold text-3xl text-center text-orange-100 md:text-orange-800 mb-4">Pricing</h1>

      <div className=" h-[calc(100vh-120px)] md:h-[calc(100vh-180px)] w-full flex flex-wrap gap-3 md:gap-11 justify-center overflow-y-auto ">

        <SubcriptionCard
          annually={0}
          monthly={0}
          discount={0}
          title="Community"
          ads={true}
          depositFee={5}
          payoutFee={5}
          bitcoin={true}
          paypal={false}
          visa={false}
          payoutMinimun={100}
          mastercard={false}
          onGetStarted={onGetStarted}
          wireBank={false} />

        <SubcriptionCard
          annually={54.89}
          monthly={4.99}
          discount={8.34}
          title="Professional"
          tag="Popular"
          ads={false}
          depositFee={0}
          payoutFee={0}
          stripe={true}
          bitcoin={false}
          paypal={false}
          visa={true}
          payoutMinimun={50}
          mastercard={true}
          onGetStarted={onGetStarted}
          wireBank={false} />

      </div>




    </div>
  )
}