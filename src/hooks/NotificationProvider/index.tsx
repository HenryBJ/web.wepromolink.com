import React, { Children, createContext, useEffect, useState } from 'react';
import { getNotificationBadget, updateNotificationBadget } from '../../services';
import { INotificationBadget } from '../../interfaces/ViewModels';
import { INotificationBadgetResponse } from '../../interfaces/Responses';



const INTERVAL = 20000;

// All field are relaed to unread notifications
const initial: INotificationBadget = {
  id: 0,
  notification: 0,
  campaing: 0,
  links: 0,
  clicks: 0,
  deposit: 0,
  withdraw: 0,
  flag: ""
}

export const NotificationContext = createContext<any>(null);

export default function Index({ children }: any) {
  const [notification, setNotification] = useState<INotificationBadget>(initial);

  const updateNotiBadget = (data: INotificationBadget) => {
    updateNotificationBadget(data)
      .then(res => setNotification(res.data.value));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getNotificationBadget(notification.id)
        .then(res => {
          let newNoti: INotificationBadget = res.data.value;
          if (newNoti.flag !== notification.flag) {
            setNotification(newNoti);
          }
        });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [notification.flag]);

  return (
    <NotificationContext.Provider value={{ notification, updateNotiBadget }}>
      {children}
    </NotificationContext.Provider>
  );
}
