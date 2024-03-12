import { useEffect, useState } from "react";
import SubcriptionCard from "../../components/SubcriptionCard";
import {
  checkout,
  getSubscriptionCards,
  signUp,
  upgrade,
} from "../../services";
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

  useVisit("visit_pricing");

  useEffect(() => {
    setLoadingPage(true);
    getSubscriptionCards()
      .then((res) => setPricingPlans(res.data))
      .catch((error) => console.log(error))
      .finally(() => setLoadingPage(false));
  }, []);

  const signPlan0 = (data: ISigUpInfo) => {
    signUp({
      email: data.user.email!,
      firebaseId: data.user.uid,
      fullname: data.user.displayName!,
      photoUrl: data.user.photoURL!,
      subscriptionPlanId: data.planId,
    }).then(async (response) => {
      if (response.data) {
        gTag("sign_up", {
          method: "Google",
          planId: data.planId,
          userName: data.user.displayName,
          email: data.user.email,
        });
        login(data.user, await data.user.getIdToken());
      } else {
        toast.error("Registration failed - email may already be registered.");
      }
    });
  };

  const signPlan1 = (data: ISigUpInfo) => {
    gTag("sign_up", {
      method: "Google",
      planId: data.planId,
      userName: data.user.displayName,
      email: data.user.email,
    });

    data.priceId &&
      checkout(data.priceId, data.user.uid, data.user.photoURL).then((res) =>
        window.open(res.data, "_self")
      );
  };

  const onUpgrade = (priceId?: string, id?: string) => {
    if (priceId && id) {
      upgrade(priceId, id).then((res) => window.open(res.data, "_self"));
    }
  };

  const onGetStarted = (priceId?: string, id?: string) => {
    setLoading(true);
    try {
      if (!user) {
        signInWithGoogle()
          .then(async (result) => {
            if (priceId) {
              signPlan1({ planId: id!, user: result.user, priceId });
            } else {
              signPlan0({ planId: id!, user: result.user, priceId });
            }
          })
          .catch((_) => {
            setLoading(false);
          });
      } else {
        if (priceId) {
          signPlan1({ planId: id!, user, priceId });
        } else {
          signPlan0({ planId: id!, user, priceId });
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto pt-12 md:pt-0 md:mt-5 relative">
      <div className="bg-blue-500 w-full text-white flex item-center justify-center mt-1 text-sm md:text-md ">
        This platform is on <b>TESTING MODE</b>, no real money is use
      </div>
      <h1 className="font-bold text-3xl text-center text-orange-100 md:text-orange-800 mb-4">
        Pricing
      </h1>

      {process.env.REACT_APP_LAUNCH_MODE === "prelaunch" && (
        <div className="text-orange-100 md:text-orange-800 font-semibold text-xl md:text-2xl px-4 md:px-24 text-center w-full">
          📣 Hey there, Awesome Promoter! <br />
          <div className="text-left text-lg">
            <br />
            Exciting news! 🌟 Our subscription plans are currently under review
            🕵️, and we're working hard to make them even more amazing for you.
            💪
            <br />
            <br />
            But here's the best part: Our basic plan will always be FREE 🎉 with
            no monthly fees! 😲 You'll only pay a tiny 10% fee from the earnings
            when someone clicks your affiliate link. 💰
            <br />
            <br />
            Thanks for being part of the WePromoLink community! 🙌
            <br />
            <br />
            Happy Promoting! 🚀✨
          </div>
        </div>
      )}

      {process.env.REACT_APP_LAUNCH_MODE === "live" && (
        <>
          <div className=" h-[calc(100vh-120px)] md:h-[calc(100vh-180px)] w-full flex flex-wrap gap-3 md:gap-11 justify-center overflow-y-auto ">
            {pricingPlans &&
              pricingPlans
                .sort((a, b) => a.order - b.order)
                .map((e, index) => (
                  <SubcriptionCard
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
                    monthlyPriceId={e.monthlyPriceId}
                    annualyPriceId={e.annualyPriceId}
                    disabled={e.disabled}
                    upgradeable={e.upgradeable}
                    onGetStarted={e.upgradeable ? onUpgrade : onGetStarted}
                  />
                ))}
          </div>
          {loadingPage && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <Spinner text="" type={SpinnerType.Alternative} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
