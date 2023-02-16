import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { ICreateAffLink } from "../../interfaces/Request";
import { AffLinkMock } from "./mock";

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


