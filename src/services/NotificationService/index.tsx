import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { INotificationBadget } from "../../hooks/NotificationProvider";
import { notiMock } from "./mock";

export function GetNotificationBadget(id:Number) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: notiMock });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`badget?id=${id}`)
    }
}

export function UpdateNotificationBadget(data: INotificationBadget) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: notiMock });
                },5000);

            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.post("/badget", data)
    }
}