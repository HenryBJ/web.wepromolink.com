
import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { stats } from "./mock";

export function GetHistoricalClickOnLinks() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: stats });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`gethistoricalclickonlink`)
    }
}

export function GetHistoricalEarnOnLinks() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: stats });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`gethistoricalearnonlink`)
    }
}

export function GetHistoricalClickOnCampaigns() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: stats });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`gethistoricalearnoncampaigns`)
    }
}

export function GetHistoricalClickOnShares() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: stats });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`gethistoricalearnonshares`)
    }
}

export function GetClickOnLinksByCountries() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: stats });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getbarsclickonlinksbycountries`)
    }
}

export function GetEarnByCountries() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: stats });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getearnbycountries`)
    }
}

export function GetClickOnCampaignsByCountries() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: stats });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getclickoncampaignsbycountries`)
    }
}

export function GetSharedByUsers() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: stats });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getsharedbyusers`)
    }
}


export function GetEarnTodayData() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: 45
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getearntoday`)
    }
}

export function GetEarnLastWeekData() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: 45
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getearnlastweekdata`)
    }
}

export function GetClicksTodayOnLinkData() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: 12
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getclickstodayonlinkdata`)
    }
}

export function GetClicksLastWeekOnLinkData() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: 12
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getclickslastweekonlinkdata`)
    }
}

export function GetClicksTodayOnCompaingData() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: 100
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getclickstodayoncompaingdata`)
    }
}

export function GetClicksLastWeekOnCompaingData() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: 12
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getclickslastweekoncompaingdata`)
    }
}

export function GetSharedTodayData() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: 76
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getsharedtodaydata`)
    }
}

export function GetSharedLastWeekData() {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve: (value: AxiosResponse | any) => void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({
                        data: 234
                    });
                }, 5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`getsharedlastweekdata`)
    }
}