
import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { subsListMock } from "./mock";

export function GetSubscriptionPlans(page:Number) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: subsListMock });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`badget?page=${page}`)
    }
}

export function GetSubscriptionDetail(id: string) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: {
                            id: '1',
                            title: 'Community',
                            price: 4.99,
                            interval: 'monthly',
                            discount:0,
                            inUse: true,
                            ads: true,
                            depositFee:5,
                            payoutFee:5,
                            payoutMinimun:100,
                            paymentMethod:'Bitcoin',
                            tag:'Popular'
                        }
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`mysubscriptiondetail?id=${id}`)
    }
}

export function ChangeToPlan(id: string) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve(true);
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.post('changetoplan',id)
    }
}