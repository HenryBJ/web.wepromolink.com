import React, { Children, createContext, useEffect, useState } from 'react';
import { GetNotificationBadget, UpdateNotificationBadget } from '../../services/NotificationService';

export interface INotificationBadget {
  id: Number,
  notification: Number,
  campaing: Number,
  links: Number,
  clicks: Number,
  deposit: Number,
  withdraw: Number,
  flag: string
}

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

  const updateNotificationBadget = (data: INotificationBadget) => {
    UpdateNotificationBadget(data)
      .then(() => setNotification(data));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      GetNotificationBadget(notification.id)
        .then(res => {
          let newNoti: INotificationBadget = res.data;
          if (newNoti.flag !== notification.flag) {
            setNotification(newNoti);
          }
        });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [notification.flag]);

  return (
    <NotificationContext.Provider value={{ notification, updateNotificationBadget }}>
      {children}
    </NotificationContext.Provider>
  );
}
