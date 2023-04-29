import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialNetworks from "../../components/SocialNetworks";

export default function Contact() {

  const style = 'text-white md:text-orange-800 mr-2 ml-2 text-xl';

  return (
    <div className="relative h-screen md:h-auto container max-w-3xl mx-auto flex gap-8 items-center flex-col justify-start  text-orange-100 md:text-orange-800  pt-12 md:pt-0 md:mt-5 ">
      <h1 className="font-bold text-3xl text-center text-orange-100 md:text-orange-800 mb-4">Contact us</h1>

      <div className="text-lg border-2 border-white md:border-orange-800 p-4 rounded-lg flex flex-col gap-2">
        <span className="font-bold text-2xl">B-Tech Innovation Studios</span>
        <div className="flex flex-col gap-1 text-base">
          <span>651 N Broad St, Suite 201</span>
          <span>Middletown, DE, USA, 19709</span>
        </div>
        <div><FontAwesomeIcon icon={faPhone} className={style} /><a href="tel:+13026015704">+1 302 601 5704</a></div>
        <div><FontAwesomeIcon icon={faEnvelope} className={style} /><a href="mailto:support@wepromolink.com">support@wepromolink.com</a></div>
        <div><FontAwesomeIcon icon={faWhatsapp} className={style} /><a href="https://chat.whatsapp.com/Itdy4Fgx9ld3UYClzUCPU6">Join us in WhatsApp</a></div>
        <div><FontAwesomeIcon icon={faTelegram} className={style} /><a href="https://t.me/wepromolink_support">Join us in Telegram</a></div>
      </div>

      <div className="absolute flex items-center bottom-4 md:hidden">
        <SocialNetworks />
      </div>

    </div>
  )
}