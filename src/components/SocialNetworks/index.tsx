import { faFacebook, faInstagram, faPinterest, faTelegram, faTiktok, faWhatsapp, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPros {
    alternative?: boolean
}
export default function Index({ alternative }: IPros) {

    const style = alternative ? 'text-white md:text-orange-500 mr-2 ml-2 text-2xl hover:text-orange-800': 'text-white mr-2 ml-2 text-2xl hover:text-orange-800';

    const socials = [
        { icon: faFacebook, href: "https://www.facebook.com/wepromolink" },
        { icon: faXTwitter, href: "https://twitter.com/WePromoLink" },
        { icon: faTelegram, href: "https://t.me/wepromolink_support" },
        { icon: faWhatsapp, href: "https://chat.whatsapp.com/Itdy4Fgx9ld3UYClzUCPU6" },
        { icon: faInstagram, href: "https://www.instagram.com/wepromolink" },
        { icon: faPinterest, href: "https://www.pinterest.com/wepromolink" },
        { icon: faTiktok, href: "https://www.tiktok.com/@wepromolink_official" },
        { icon: faYoutube, href: "https://www.youtube.com/@wepromolink" }
    ];

    return (
        <div className="mt-10  text-center">
            {socials.map((social, index) => (
                <a key={index} href={social.href} target="_blank">
                    <FontAwesomeIcon icon={social.icon} className={style} />
                </a>
            ))}
        </div>
    )
}