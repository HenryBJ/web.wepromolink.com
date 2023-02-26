import { useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../hooks/NotificationProvider"

export default function Index({ children, notiIndex }: any) {

    const [badge, setbadge] = useState(0);
    const {notification} = useContext(NotificationContext);

    useEffect(()=>{
        if(notiIndex){
            setbadge(notification[notiIndex]);
        }
    },[notification.flag]);
    

    return (
        <div className="group relative">
            {children}
            {badge?<span className="group-hover:hidden absolute top-0 -right-2 bg-red-600 rounded-full px-1 text-[9px] text-white font-bold ring-1 ring-orange-200">{badge}</span>:''}
        </div>)
}