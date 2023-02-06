import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { ICreateAffLink, ICreateAffLinkResponse } from "../../interfaces/ICreateAffLink";

export function CreateAffLink(data: ICreateAffLink) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: mockObj });
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

let mockObj: ICreateAffLinkResponse =
{
    id: "Kwxo3pH5Vxq2b-dX",
    link: "https://api.wepromolink.com/Kwxo3pH5Vxq2b-dX"
};
