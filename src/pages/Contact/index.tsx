import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialNetworks from "../../components/SocialNetworks";

export default function Contact() {

  const style = 'text-white md:text-orange-800 mr-2 ml-2 text-xl';

    const contacts = [
        {icon: faPhone, text: '+1 302 601 5704', href: "tel:+13026015704"},
        {icon: faEnvelope, text: 'support@wepromolink.com', href: "mailto:support@wepromolink.com"},
        {icon: faWhatsapp, text: 'Join us in WhatsApp', href: "https://chat.whatsapp.com/Itdy4Fgx9ld3UYClzUCPU6"},
        {icon: faTelegram, text: 'Join us in Telegram', href: "https://t.me/wepromolink_support"}
    ];

  return (
    <div className="relative h-screen md:h-auto container max-w-3xl mx-auto flex gap-8 items-center flex-col justify-start  text-orange-100 md:text-orange-800  pt-12 md:pt-0 md:mt-5 ">
      <h1 className="font-bold text-3xl text-center text-orange-100 md:text-orange-800 mb-4">Contact us</h1>

      <div className="text-lg border-2 border-white md:border-orange-800 p-4 rounded-lg flex flex-col gap-2">
        <span className="font-bold text-2xl">B-Tech Innovation Studios</span>
        <div className="flex flex-col gap-1 text-base">
          <span>651 N Broad St, Suite 201</span>
          <span>Middletown, DE, USA, 19709</span>
        </div>
          {contacts.map((contact, index) => (
              <div key={index}>
                  <FontAwesomeIcon icon={contact.icon} className={style} />
                  <a href={contact.href}>{contact.text}</a>
              </div>
          ))}
      </div>

      <div className="absolute flex items-center bottom-4 md:hidden">
        <SocialNetworks />
      </div>

    </div>
  )
}