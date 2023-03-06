import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { IPayoutData } from "../../interfaces/ViewModels";
import { payoutMock } from "./mock";

export function GetPayoutData() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: payoutMock });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`payout`)
    }
}

export function UpdatePayout(data: IPayoutData) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({});
                },5000);

            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.post("/payout", data)
    }
}