import { faSwimmingPool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import GoogleIcon from "../../components/Google";
import Logo from "../../components/Logo";
import { signInWithGoogle } from "../../firebase"

export default function Home() {

  const Click = () => {
    signInWithGoogle()
      .then(result => {
        console.log(result);
        alert(result.user.email)
      })
      .catch(error => {
        console.log(error);
        alert(error)
      })
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
        <div className="text-orange-100 md:text-orange-800 font-semibold text-lg md:text-2xl w-3/5 text-center">
          <span>Try the easiest way to advertise your campaign or monetize by sharing on social networks</span>
        </div>
        <button onClick={Click} className="bg-white  md:bg-orange-300 md:hover:bg-orange-500 text-orange-600 md:text-orange-900 md:hover:text-white font-bold py-2 px-4 rounded-full min-w-fit ">
          <div className="flex w-56">
            <div>
              <GoogleIcon />
            </div>
            <div className="grow">
              <span>
                Log In with Google
              </span>
            </div>
          </div>
        </button>
        <div className="text-orange-100 md:text-orange-800 font-semibold text-sm w-3/5 text-center">
          <span>By signing up you accept our <Link to="/terms"><u>Terms & Conditions</u></Link> </span>
        </div>
      </div>
    </>

  )
}
