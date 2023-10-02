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
import Spinner, { SpinnerType } from "../../components/Spinner";

export default function Pricing() {

  const [pricingPlans, setPricingPlans] = useState<ISubscriptionPlanCard[]>();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const navigate = useNavigate();

  useVisit('visit_pricing');

  useEffect(() => {
    setLoadingPage(true);
    getSubscriptionCards()
      .then(res => setPricingPlans(res.data))
      .catch(error => console.log(error))
      .finally(() => setLoadingPage(false));
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

    <div className="container max-w-6xl mx-auto pt-12 md:pt-0 md:mt-5 relative">
      <h1 className="font-bold text-3xl text-center text-orange-100 md:text-orange-800 mb-4">Pricing</h1>

      {process.env.REACT_APP_LAUNCH_MODE === 'prelaunch' &&
        <div className="text-orange-100 md:text-orange-800 font-semibold text-xl md:text-2xl px-4 md:px-24 text-center w-full">
          📣 Hey there, Awesome Promoter! <br />

          <div className="text-left text-lg">
            <br/>
            Exciting news! 🌟 Our subscription plans are currently under review 🕵️, and we're working hard to make them even more amazing for you. 💪<br />
            <br />
            But here's the best part: Our basic plan will always be FREE 🎉 with no monthly fees! 😲 You'll only pay a tiny 10% fee from the earnings when someone clicks your affiliate link. 💰<br />
            <br />
            Thanks for being part of the WePromoLink community! 🙌<br />
            <br />
            Happy Promoting! 🚀✨
          </div>

        </div>
      }

      {process.env.REACT_APP_LAUNCH_MODE === 'live' &&
        <>
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
              tag={e.tag}
              loading={loading}
              monthlyPaymantLink={e.monthlyPaymantLink}
              annualyPaymantLink={e.annualyPaymantLink}
              onGetStarted={onGetStarted}
            />)
            )}
          </div>
          {loadingPage &&
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <Spinner text="" type={SpinnerType.Alternative} />
            </div>}
        </>}
    </div>
  )
}