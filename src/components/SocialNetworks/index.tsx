import { faFacebook, faInstagram, faPinterest, faTelegram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Index(){

    const style = 'text-white mr-2 ml-2 text-2xl hover:text-orange-800';
    
    return (
        <div className="mt-10  text-center">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} className={style} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} className={style} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTelegram} className={style} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faWhatsapp} className={style} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} className={style} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faPinterest} className={style} />
          </a>
        </div>
    )
}