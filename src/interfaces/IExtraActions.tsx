import { ReactElement } from "react";

export interface IExtraActions {
    title: string,
    icon: ReactElement,
    action: (value: any, navegation:any) => void,
}