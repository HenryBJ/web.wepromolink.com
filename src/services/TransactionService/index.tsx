import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { transactionList } from "./mock";

export function GetTransactions(page:Number) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: transactionList });
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

export function GetTransactionDetail(id: string) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: {
                            id: '1',
                            title: 'BTC DEPOSIT',
                            status: 'PENDING',
                            amount: 100,
                            created: new Date(),
                        }
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`mytransactiondetail?id=${id}`)
    }
}
