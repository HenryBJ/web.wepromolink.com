import { createContext, useEffect, useState } from 'react';
import { getPushNotification } from '../../services';
import { IPushNotification } from '../../interfaces/ViewModels';
import { toast } from 'react-toastify';



const INTERVAL = 20000;

// All field are relaed to unread notifications
const initial: IPushNotification = {
  notification: 0,
  campaign: 0,
  links: 0,
  transaction: 0,
  messages: [],
  etag: ''
}

export const NotificationContext = createContext<any>(null);

export default function Index({ children }: any) {
  const [notification, setNotification] = useState<IPushNotification>(initial);


  const reducePushNotification = (reducer: (e: IPushNotification) => IPushNotification) => {
    setNotification(prev=>reducer(prev));
  }

  const handleNotification = (data: IPushNotification) => {
    setNotification(prev => ({
      campaign: prev.campaign + data.campaign,
      messages: [],
      etag: data.etag,
      links: prev.links + data.links,
      notification: prev.notification + data.notification,
      transaction: prev.transaction + data.transaction
    }));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getPushNotification()
        .then(res => {
          let newNoti: IPushNotification = res.data;
          if (newNoti.etag !== notification.etag) {
            newNoti.messages.map(e => toast.success(<div dangerouslySetInnerHTML={{ __html: e }} />));
            handleNotification(newNoti);
          }
        });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [notification.etag]);

  return (
    <NotificationContext.Provider value={{ notification, reducePushNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
