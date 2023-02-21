import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { ICreateAffLink } from "../../interfaces/Request";
import { AffLinkMock, myAffLinkList } from "./mock";

export function CreateAffLink(data: ICreateAffLink) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: AffLinkMock });
                },5000);

            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.post("/afflink", data)
    }
}

export function GetMyAffLinks(page:Number, filter:string, cant:Number=50) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: myAffLinkList });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`afflinks?page=${page}&cant=${cant}&filter=${filter}`)
    }
}


