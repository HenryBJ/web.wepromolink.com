import { ReactElement } from "react";
import { IPushNotification } from "../ViewModels";

export interface IOption {
    id: number,
    name: string,
    icon?: ReactElement,
    selected: boolean,
}

export interface INotificationContext {
    notification: IPushNotification,
    reducePushNotification: (reducer: (e: IPushNotification) => IPushNotification) => void
}