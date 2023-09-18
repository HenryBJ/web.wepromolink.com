import { useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../hooks/NotificationProvider"

export default function Index({ children, notiIndex }: any) {

    const [badge, setbadge] = useState<string>('0');
    const { notification } = useContext(NotificationContext);

    useEffect(() => {
        if (notiIndex) {
            setbadge(notification[notiIndex] > 99 ? '99+' : `${notification[notiIndex]}`);
        }
    }, [notification.etag, notification[notiIndex]]);


    return (
        <div className="group relative">
            {children}
            {badge !== '0'  ? <span className="flex justify-center items-center group-hover:hidden absolute top-0 -right-2 bg-red-600 rounded-full h-4 min-w-[16px] px-1  text-[11px] text-white font-bold ring-2 ring-white/80">{badge}</span> : ''}
        </div>)
}