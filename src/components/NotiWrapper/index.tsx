import { useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../hooks/NotificationProvider"
import { motion, useAnimation } from "framer-motion";

export default function Index({ children, notiIndex }: any) {

    const [badge, setbadge] = useState<string>('0');
    const { notification } = useContext(NotificationContext);
    const controls = useAnimation();

    useEffect(() => {
        if (notiIndex) {
            setbadge(notification[notiIndex] > 99 ? '99+' : `${notification[notiIndex]}`);
            controls.start({
                scale: [0.2, 1, 0.2, 1],
                opacity: [0, 1, 0, 1],
            });
        }
    }, [notification.etag, notification[notiIndex]]);


    return (
        <div className="group relative">
            {children}
            {badge !== '0' ?
                <motion.span
                className="flex justify-center items-center group-hover:hidden absolute top-0 -right-2 bg-red-600 rounded-full h-4 min-w-[16px] px-1  text-[11px] text-white font-bold ring-2 ring-white/80"
                animate={controls}
                transition={{ duration: 1 }} // Duración de la animación en segundos
            >
                {badge}
            </motion.span> : ''}
        </div>)
}

