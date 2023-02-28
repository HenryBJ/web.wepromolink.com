import { INotificationBadget } from "../../hooks/NotificationProvider";
import { INotificationResponse } from "../../interfaces/Responses";


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

export const notiListMock: INotificationResponse = {
  pagination: { cant: 44, page: 1, totalPages: 44, lastPage:50},
  items: [
      {id:1,title:"Deposit created",message:"El deposito esta siendo procesado", status:"UNREAD",created:new Date() },
      {id:2,title:"Deposit created",message:"El deposito esta siendo procesado", status:"UNREAD",created:new Date() },
      {id:3,title:"Deposit created",message:"El deposito esta siendo procesado", status:"UNREAD",created:new Date() },
      {id:4,title:"Deposit created",message:"El deposito esta siendo procesado", status:"UNREAD",created:new Date() },
      {id:5,title:"Deposit created",message:"El deposito esta siendo procesado", status:"UNREAD",created:new Date() },
      {id:6,title:"Deposit created",message:"El deposito esta siendo procesado", status:"UNREAD",created:new Date() },
      {id:7,title:"Deposit created",message:"El deposito esta siendo procesado", status:"UNREAD",created:new Date() },
      {id:8,title:"Deposit created",message:"El deposito esta siendo procesado", status:"UNREAD",created:new Date() },
      {id:9,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:10,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:11,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:12,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:13,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:14,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:15,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:16,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:17,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:18,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
      {id:19,title:"Deposit created",message:"El deposito esta siendo procesado", status:"READ",created:new Date() },
  ]
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