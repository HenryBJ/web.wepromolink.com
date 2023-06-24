import { faFacebook, faInstagram, faPinterest, faTelegram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Index(){

    const style = 'text-white mr-2 ml-2 text-2xl hover:text-orange-800';

    const socials = [
        //{icon: faFacebook, href: "https://www.facebook.com/yourusername"},
        {icon: faTwitter, href: "https://twitter.com/WePromoLink"},
        {icon: faTelegram, href: "https://t.me/wepromolink_support"},
        {icon: faWhatsapp, href: "https://chat.whatsapp.com/Itdy4Fgx9ld3UYClzUCPU6"},
        //{icon: faInstagram, href: "https://www.instagram.com/yourusername"},
        //{icon: faPinterest, href: "https://www.pinterest.com/yourusername"},
    ];

    return (
        <div className="mt-10  text-center">
            {socials.map((social, index) => (
                <a key={index} href={social.href} target="_blank">
                    <FontAwesomeIcon icon={social.icon} className={style}/>
                </a>
            ))}
        </div>
    )
}