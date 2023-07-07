import { ReactElement } from "react";

export interface IOption {
    id: number,
    name: string,
    icon?: ReactElement,
    selected: boolean,
}