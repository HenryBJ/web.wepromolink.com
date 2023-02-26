import { INotificationBadget } from "../../hooks/NotificationProvider";


export const notiMock: INotificationBadget = {
    id: 0,
    campaing: 9,
    clicks: 0,
    deposit: 0,
    links: 1,
    notification: 0,
    withdraw: 0,
    flag:"demo"
}

export function generateRandomObject(obj: INotificationBadget): INotificationBadget {
    const maxValue:number = 100;
    const randomObj:any = {...obj}; // Clona el objeto original
    for (const key in randomObj) {
      if (key !== "id") {
        randomObj[key as keyof INotificationBadget] = Math.floor(Math.random() * maxValue);
      }
    }
    return randomObj;
  }