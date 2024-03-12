import { Link, Navigate, useNavigate } from "react-router-dom";
import GoogleIcon from "../../components/Google";
import Logo from "../../components/Logo";
import firebase, { fbLogOut, signInWithGoogle } from "../../firebase"
import { useAuth } from "../../hooks/Auth";
import { User } from "firebase/auth";
import { getIsEmailSignUp } from "../../services";
import useVisit from "../../hooks/Visit";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { env } from "process";
import JoinWaitingList from "../../components/JoinWaitingList";

export default function Home() {

  const { user, login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useVisit('visit_home');

  const Click = () => {
    if (user) {
      fbLogOut().then(() => logout())
    }
    else {
      setLoading(true);
      signInWithGoogle()
        .then(result => {
          getIsEmailSignUp(result.user.email || '')
            .then(async res => {
              if (Boolean(res.data)) {
                const { uid } = result.user;
                login(result.user, await result.user.getIdToken());
              } else {
                result.user.email && navigate('/pricing');
              }
            })
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setLoading(false))
    }
  }

  const GoToDashBoard = () => {
    navigate('/dashboard');
  }


  return (
    <>
      <div className=" h-full flex justify-between items-center flex-col pt-9" >
        <div className="hidden md:block">
          <span className="uppercase text-orange-900 font-bold text-4xl">Welcome dear marketer</span>
        </div>
        <div className="md:hidden">
          <Logo scale={0.9} />
        </div>
        {process.env.REACT_APP_LAUNCH_MODE === 'live' &&
          <div className="text-orange-100 md:text-orange-800 font-semibold text-lg md:text-3xl w-4/5 text-center">
            <span>Promotion and advertising platform | Unleash the potential of your social networks </span>
          </div>}

        {process.env.REACT_APP_LAUNCH_MODE === 'live' ? <div className="flex flex-col gap-2 justify-center items-center">
          {user ? <button onClick={GoToDashBoard} className="bg-white  md:bg-orange-300 md:hover:bg-orange-500 text-orange-600 md:text-orange-900 md:hover:text-white font-bold py-2 px-4 rounded-full min-w-fit ">
            <div className="flex w-56">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-7 h-7'>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                </svg>
              </div>
              <div className="grow">
                <span> Go to dashboard </span>
              </div>
            </div>
          </button> : ''}

          <button onClick={Click} disabled={loading} className={loading ? "bg-white md:bg-orange-200  text-orange-300 md:text-orange-300  font-bold py-2 px-4 rounded-full min-w-fit" : "bg-white md:bg-orange-300 md:hover:bg-orange-500 text-orange-600 md:text-orange-900 md:hover:text-white font-bold py-2 px-4 rounded-full min-w-fit"}>
            <div className="flex w-56">
              <div>
                <GoogleIcon />
              </div>
              <div className="grow">
                <div className="flex justify-center">
                  {loading && <Spinner text="" />}
                  {user ? 'Logout' : 'Sign In'}
                </div>
              </div>
            </div>
          </button>
          {!user && <button onClick={() => navigate("/pricing")} className="bg-white  md:bg-orange-300 md:hover:bg-orange-500 text-orange-600 md:text-orange-900 md:hover:text-white font-bold py-2 px-4 rounded-full min-w-fit ">
            <div className="flex w-56">
              <div>
                <GoogleIcon />
              </div>
              <div className="grow">
                <span>
                  Sign Up
                </span>
              </div>
            </div>
          </button>}
        </div> : <JoinWaitingList />}

        <div className="text-orange-100 md:text-orange-800 font-semibold text-sm w-3/5 text-center">
          <span>By signing up you accept our <Link to="/terms"><u>Terms & Conditions</u></Link> </span>
        </div>
      </div>
    </>

  )
}
