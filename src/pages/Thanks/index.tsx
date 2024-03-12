import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/Auth";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../firebase";
import { getIsEmailSignUp } from "../../services";
import GoogleIcon from "../../components/Google";
import useVisit from "../../hooks/Visit";

export default function Faq() {
  const myRef = useRef(null);

  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  useVisit('visit_thanks');

  useEffect(() => {
    if (myRef.current) {
      const table: any = myRef.current;
      // const delta = width < 752 ? 12 : 10;
      table.style.minHeight = `calc(100vh - ${table.offsetTop + 110}px)`;
    }
  }, []);

  useEffect(() => {
    if (user) logout()
  }, []);

  const Click = () => {
    signInWithGoogle()
      .then(async result => {
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
  }


  return (
    <div className="container max-w-3xl mx-auto z-50 pt-12 md:pt-0 md:mt-5 ">
      {/* <h1 className="font-bold text-2xl text-center text-orange-100 md:text-orange-800">Registration Complete</h1> */}
      <div ref={myRef} className="rounded-md p-4 overflow-y-auto  flex flex-col justify-center items-center gap-5 md:gap-9">
        <FontAwesomeIcon icon={faSmile} className="text-6xl text-orange-100 md:text-orange-800" />
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl text-center text-orange-100 md:text-orange-800">Congratulations!</h1>
          <h2 className="font-bold text-xl text-center text-orange-100 md:text-orange-800">You're all set to start your journey with us. You can now log in and let the adventure begin!</h2>
        </div>

        <button onClick={Click} className="bg-white  md:bg-orange-300 md:hover:bg-orange-500 text-orange-600 md:text-orange-900 md:hover:text-white font-bold py-2 px-4 rounded-full min-w-fit ">
          <div className="flex w-56">
            <div>
              <GoogleIcon />
            </div>
            <div className="grow">
              <span>
                {user ? 'Logout' : 'Log In with Google'}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
