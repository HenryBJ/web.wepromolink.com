import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode, useEffect, useState } from "react"
import GenericDialog from "../GenericDialog";
import { getIsSubscribed } from "../../services";

interface IProps {
    children: ReactNode
    style: string,
    onClick?: () => void
}

const INTERVAL = 1800000; // 30 mins

export default function Index({ children, style, onClick }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(true);


    const text = "Due to the fact that your subscription is not active, this functionality is not available, for more details please contact our team";

    useEffect(() => {
        getIsSubscribed()
            .then(response => setIsSubscribed(response.data.valueOf()))

        const timer = setInterval(() => {
            getIsSubscribed()
                .then(response => setIsSubscribed(response.data.valueOf()))
        }, INTERVAL);
        return () => clearInterval(timer);
    }, [isSubscribed])

    const handleClick = () => {
        if (isSubscribed) {
            if (onClick) {
                onClick(); // Invocar la función onClick si está definida
            }
        } else {
            setIsOpen(true); // Abrir el diálogo
        }
    };

    return (
        <div className={`relative flex flex-col ${style}`} onClick={handleClick} >
            {children}
            {!isSubscribed && <div title="Not Available" className="flex justify-center items-center rounded absolute bg-gray-500/60 top-0 left-0 w-full h-full cursor-pointer ">
                <FontAwesomeIcon icon={faLock} className="text-white text-xl" />
                <GenericDialog isOpen={isOpen} setIsOpen={setIsOpen} title={"Subscription NOT Active"} description={text} />
            </div>}
        </div>)
}