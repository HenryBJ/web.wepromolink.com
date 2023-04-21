import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { ICreateCampaign } from "../../interfaces/ViewModels";
import { CampaingStatsMock, campaignToFeedList, myCampaingList } from "./mock";

export function GetCampaigns(page: Number) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: campaignToFeedList });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`links?page=${page}`)
    }
}

export function GetMyCampaigns(page: Number, filter: string, cant: Number = 50) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: myCampaingList });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`mycampaigns?page=${page}&cant=${cant}&filter=${filter}`)
    }
}

export function GetCampaignDetail(id: string) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: {
                            id: '1',
                            title: 'HenryDeveloper',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.',
                            url: 'https://henrydeveloper.com',
                            imageUrl: 'https://wepromolink.com/card.png',
                            status: true,
                            budget: 100,
                            epm: 15,
                            lastClick: new Date(),
                            lastShared: new Date()
                        }
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`mycampaigndetail?id=${id}`)
    }
}

export function GetLinkAffDetail(id: string) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: {
                            id: '1',
                            title: 'HenryDeveloper',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.',
                            url: 'https://henrydeveloper.com',
                            imageUrl: 'https://wepromolink.com/card.png',
                            available: 100,
                            epm: 15,
                            lastClick: new Date(),
                        }
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`mylinkaffdetail?id=${id}`)
    }
}

export function CreateCampaigns(data: ICreateCampaign) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: "A-P3eaApJtuv" }); // new campaignId
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.post("link", data)
    }
}

export function GetCampaignStats(id: string) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: CampaingStatsMock
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`mycampaigndetail?id=${id}`)
    }
}