import { useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../hooks/NotificationProvider"

export default function Index({ children, notiIndex }: any) {

    const [badge, setbadge] = useState(0);
    const {notification} = useContext(NotificationContext);

    useEffect(()=>{
        if(notiIndex){
            setbadge(notification[notiIndex]);
        }
    },[badge]);
    

    return (
        <div className="relative inline group">
            {children}
            {badge?<span className="group-hover:hidden absolute -bottom-1 -right-2 bg-red-600 rounded-full px-1 text-xs text-white font-bold">99</span>:''}
        </div>)
}