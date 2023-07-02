import { useEffect, useState } from "react";
import SubcriptionCard from "../../components/SubcriptionCard";
import { getSubscriptionCards, signUp } from "../../services";
import { ISigUpInfo, ISubscriptionPlanCard } from "../../interfaces/ViewModels";
import { useAuth } from "../../hooks/Auth";
import { gTag, signInWithGoogle } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, UserCredential } from "firebase/auth";
import useVisit from "../../hooks/Visit";

export default function Pricing() {

  const [pricingPlans, setPricingPlans] = useState<ISubscriptionPlanCard[]>();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useVisit('visit_pricing');

  useEffect(() => {
    getSubscriptionCards()
      .then(res => setPricingPlans(res.data))
      .catch(error => console.log(error));
  }, []);

  const signningUp = (photoUrl: string, email: string, fullname: string, firebaseId: string, planId: string, user: User) => {

    let data: ISigUpInfo = {
      email: email,
      fullname: fullname,
      firebaseId: firebaseId,
      subscriptionPlanId: planId,
      photoUrl: photoUrl
    };

    signUp(data)
      .then(async response => {
        if (response.data) {
          gTag("sign_up", { method: 'Google', planId: planId, userName: fullname, email: email })
          login(user, await user.getIdToken());
        } else {
          toast.error("Registration failed - email may already be registered.");
        }
      })
  }


  const onGetStarted = (paymentLink?: string, id?: string) => {
    setLoading(true);
    try {
      if (paymentLink) {
        window.open(paymentLink, "_self");
      }
      else {
        // empty paymentlink mean free plan
        if (!user) {
          signInWithGoogle()
            .then(async result => signningUp(result.user.photoURL || "", result.user.email || "", result.user.displayName || "", result.user.uid, id || "", result.user))
            .catch(_ => {
              setLoading(false);
            })
        } else {
          signningUp(user.photoURL || "", user.email || "", user.displayName || "", user.uid, id || "", user);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (

    <div className="container max-w-6xl mx-auto z-50 pt-12 md:pt-0 md:mt-5">
      <h1 className="font-bold text-3xl text-center text-orange-100 md:text-orange-800 mb-4">Pricing</h1>

      <div className=" h-[calc(100vh-120px)] md:h-[calc(100vh-180px)] w-full flex flex-wrap gap-3 md:gap-11 justify-center overflow-y-auto ">
        {pricingPlans && pricingPlans.sort((a, b) => a.order - b.order).map((e, index) =>
        (<SubcriptionCard
          key={index}
          id={e.id}
          annually={e.annually}
          discount={e.discount}
          monthly={e.monthly}
          paymentmethod={e.paymentMethod}
          title={e.title}
          features={e.features}
          depositFee={e.depositFee}
          payoutFee={e.payoutFee}
          payoutMinimun={e.payoutMinimun}
          tag={e.tag}
          loading={loading}
          monthlyPaymantLink={e.monthlyPaymantLink}
          annualyPaymantLink={e.annualyPaymantLink}
          onGetStarted={onGetStarted}
        />)
        )}

        {/* 
        <SubcriptionCard
          annually={0}
          monthly={0}
          discount={0}
          title="Community"
          ads={true}
          depositFee={5}
          payoutFee={5}
          paymentmethod="bitcoin"
          payoutMinimun={100}
          monthlyPaymantLink=""
          annualyPaymantLink=""
          onGetStarted={onGetStarted} />

        <SubcriptionCard
          annually={244}
          monthly={24}
          discount={15}
          title="Professional"
          tag="Popular"
          ads={false}
          depositFee={0}
          payoutFee={0}
          paymentmethod="visa, mastercard, stripe"
          payoutMinimun={50}
          monthlyPaymantLink="https://buy.stripe.com/test_eVa9Es8qI0KJaOs7ss"
          annualyPaymantLink="https://beniteztechsolutions.com"
          onGetStarted={onGetStarted} /> */}
      </div>


    </div>
  )
}