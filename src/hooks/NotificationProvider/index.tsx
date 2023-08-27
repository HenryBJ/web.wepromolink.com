import { createContext, useEffect, useState } from 'react';
import { getPushNotification, updatePushNotification } from '../../services';
import { IPushNotification } from '../../interfaces/ViewModels';



const INTERVAL = 20000;

// All field are relaed to unread notifications
const initial: IPushNotification = {
  notification: 0,
  campaign: 0,
  links: 0,
  clicks: 0,
  deposit: 0,
  withdraw: 0,
  messages: [],
  etag: ''
}

export const NotificationContext = createContext<any>(null);

export default function Index({ children }: any) {
  const [notification, setNotification] = useState<IPushNotification>(initial);

  const updatePushNoti = (data: IPushNotification) => {
    updatePushNotification(data)
      .then(res => setNotification(res.data));
  }

  const reducePushNotification = (reducer: (e: IPushNotification) => IPushNotification) => {
    updatePushNoti(reducer(notification));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getPushNotification()
        .then(res => {
          let newNoti: IPushNotification = res.data;
          if (newNoti.etag !== notification.etag) {
            setNotification(newNoti);
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
