import { ReactElement } from "react";

export interface IExtraActions {
    title: string,
    icon: ReactElement,
    action: (value: any, navegation: any, reload: any, setLoading: any) => void,
    requiredConfirmation?: boolean,
    confirmationText?: string,
}