import { faFacebook, faInstagram, faPinterest, faTelegram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {  faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bio } from "./bio";

export default function Contact() {
  return (
    <div className="container max-w-3xl mx-auto flex gap-8 items-center flex-col justify-start  text-orange-100 md:text-orange-800  z-50  pt-12 md:pt-0 md:mt-5 md:h-[calc(100vh-110px)]">
      <h1 className="font-bold text-3xl text-center text-orange-100 md:text-orange-800 mb-4">Contact us</h1>
      <div className="rounded-full w-32 h-32 overflow-clip ring-2 ring-white md:ring-orange-500">
        <img src="/images/founder.png" alt="Founder" />
      </div>
      <div className="mx-4">
        <p className=" text-orange-100 md:text-orange-800 text-justify text-lg overflow-y-scroll md:h-96 h-60 ">
        {Bio}
        </p>
        <div className="mt-4  text-center">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} className=" text-orange-100 md:text-orange-500 mr-4 text-3xl" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} className=" text-orange-100 md:text-orange-500 mr-4 text-3xl" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTelegram} className=" text-orange-100 md:text-orange-500 mr-4 text-3xl" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faWhatsapp} className=" text-orange-100 md:text-orange-500 mr-4 text-3xl" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} className=" text-orange-100 md:text-orange-500 mr-4 text-3xl" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faPinterest} className=" text-orange-100 md:text-orange-500 mr-4 text-3xl" />
          </a>
        </div>
      </div>
      <div className="text-center text-orange-100 md:text-orange-500 mt-auto">
            Supported by <FontAwesomeIcon icon={faBolt} className="text-orange-100 md:text-orange-500 mx-2" />
            <a href="https://henrydeveloper.com" className="text-orange-100 md:text-orange-500 underline">henrydeveloper.com</a>
        </div>
    </div>
  )
}