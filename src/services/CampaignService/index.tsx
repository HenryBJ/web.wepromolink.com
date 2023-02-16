import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { campaignToFeedList, myCampaingList } from "./mock";

export function GetCampaigns(page:Number) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: campaignToFeedList });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`links?page=${page}`)
    }
}

export function GetMyCampaigns(page:Number, filter:string, cant:Number=50) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: myCampaingList });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`mycampaigns?page=${page}&cant=${cant}&filter=${filter}`)
    }
}