"use client";
import { createContext, useEffect, useState } from "react";
import { getPushNotification } from "../../services";
import { IPushNotification } from "../../interfaces/ViewModels";
import { toast } from "react-toastify";
import { useLocalStorage } from "../LocalStorage";

const INTERVAL = 20000;

// All field are relaed to unread notifications
const initial: IPushNotification = {
  notification: 0,
  campaign: 0,
  links: 0,
  transaction: 0,
  messages: [],
  etag: "",
};

export const NotificationContext = createContext<any>(null);

export default function Index({ children }: any) {
  const [notification, _, setNotification] = useLocalStorage<IPushNotification>(
    "wepromolink_noti",
    initial
  );
  
  const reducePushNotification = (
    reducer: (e: IPushNotification) => IPushNotification
  ) => {
    return new Promise((resolve, reject) => {
      try {
        setNotification(reducer);
        resolve(notification);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleNotification = (data: IPushNotification) => {
    setNotification((e) => ({
      campaign: e.campaign + data.campaign,
      messages: [],
      etag: data.etag,
      links: e.links + data.links,
      notification: e.notification + data.notification,
      transaction: e.transaction + data.transaction,
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      getPushNotification().then((res) => {
        let newNoti: IPushNotification = res.data;
        if (newNoti.etag !== notification.etag) {
          newNoti.messages.map((e) =>
            toast.success(<div dangerouslySetInnerHTML={{ __html: e }} />)
          );
          handleNotification(newNoti);
        }
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [notification.etag]);

  return (
    <NotificationContext.Provider
      value={{ notification, reducePushNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
