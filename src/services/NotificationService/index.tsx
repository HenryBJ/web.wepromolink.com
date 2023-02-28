import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { INotificationBadget } from "../../hooks/NotificationProvider";
import { generateRandomObject, notiListMock, notiMock } from "./mock";

export function GetNotificationBadget(id:Number) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: generateRandomObject(notiMock) });
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

export function GetNotifications(page:Number) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: notiListMock });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`notification?page=${page}`)
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