import axios, { AxiosResponse } from "axios";
import { ICampaingCard, ICreateCampaign, IMyCampaignDetail, IMyCampaignStats, INotificationBadget, IPayoutData, ISigUpInfo, IStats } from "../interfaces/ViewModels";
import { ICampaignListResponse, ICreateAffLinkResponse, IMyAffLinksResponse, IMyCampaignDetailResponse, IMyCampaignsResponse, IMyTransactionDetailResponse, INotificationBadgetResponse, INotificationDetailResponse, INotificationResponse, IPayoutDataResponse, IResponse, IResponseValue, IStatsResponse, ISubscriptionPlanCardResponse, ISubscriptionPlanDetailResponse, ISubscriptionResponse, ITransactionResponse } from "../interfaces/Responses";
import { ICreateAffLink } from "../interfaces/Request";
import AddInterceptors from "./interceptors";

export const api = AddInterceptors(axios.create({
    baseURL: process.env.REACT_APP_API_URL_WEPROMOLINK
}))

// const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL_WEPROMOLINK
// })

export const createCampaigns = (data: ICreateCampaign): Promise<AxiosResponse<IResponse>> => api.post('campaign/create', data);
export const getCampaigns = (offset: number, limit: number, timestamp: number): Promise<AxiosResponse<ICampaingCard[]>> => api.get(`campaign/explore/${offset}/${limit}/${timestamp}`);
export const getSubscriptionCards = (): Promise<AxiosResponse<ISubscriptionPlanCardResponse>> => api.get(`pricing/all`);
export const getIsEmailSignUp = (email: string): Promise<AxiosResponse<IResponse>> => api.get(`user/exits/${email}`);
export const getIsBlocked = (): Promise<AxiosResponse<IResponse>> => api.get('user/isblocked');
export const getIsSubscribed = (): Promise<AxiosResponse<IResponseValue<Boolean>>> => api.get('user/issubscribed');
export const putFirebaseUid = (email: string, uid: string): Promise<AxiosResponse<IResponse>> => api.put('user/firebaseuid', { email, uid });
export const signUp = (data: ISigUpInfo): Promise<AxiosResponse<IResponseValue<Boolean>>> => api.post("user/signup", data);
export const getAvailableBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/available`);
export const getBudgetBalanceData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/budget`);
export const getLockedBalanceData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/locked`);
export const getPayoutBalanceData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/payout`);
export const getProfitBalanceData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/profit`);
export const getEarnTodayData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/earntoday`);
export const getEarnLastWeekData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/earnlastweek`);
export const getClicksTodayOnLinkData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/clickstodayonlinks`);
export const getClicksLastWeekOnLinkData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/clickslastweekonlinks`);
export const getClicksTodayOnCompaignData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/clickstodayoncampaigns`);
export const getClicksLastWeekOnCompaignData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/clickslastweekoncampaigns`);
export const getSharedTodayData = (): Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/sharedtoday`);
export const getSharedLastWeekData = (): Promise<AxiosResponse<IResponse>> => api.get(`data/sharedlastweek`);
export const getHistoricalClickOnLinks = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclicksonlink`);
export const getHistoricalEarnOnLinks = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalearnonlink`);
export const getHistoricalClickOnCampaigns = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclickoncampaigns`);
export const getHistoricalClickOnShares = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclickonshares`);
export const getClickOnLinksByCountries = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclickbycountriesonlinks`);
export const getEarnByCountries = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalearnbycountries`);
export const getClickOnCampaignsByCountries = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclickbycountriesoncampaigns`);
export const getSharedByUsers = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalsharedbyusers`);
export const getMyCampaigns = (page: Number, filter: string, cant: Number): Promise<AxiosResponse<IMyCampaignsResponse>> => api.get(`campaign/all/${page}/${cant}/${filter}`);
export const getCampaignDetail = (id: string): Promise<AxiosResponse<IMyCampaignDetail>> => api.get(`campaign/detail/${id}`);
export const editCampaign = (id: string, data: ICreateCampaign): Promise<AxiosResponse<IResponse>> => api.put(`campaign/edit/${id}`, data);
export const getClicksLastWeekOnCampaign = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/clickslastweekoncampaign/${id}`);
export const getClicksTodayOnCampaign = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/clickstodayoncampaign/${id}`);
export const getHistoryClicksByCountriesOnCampaign = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historyclicksbycountriesoncampaign/${id}`);
export const getHistoryClicksOnCampaign = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historyclicksoncampaign/${id}`);
export const getHistorySharedByUsersOnCampaign = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historysharedbyusersoncampaign/${id}`);
export const getHistorySharedOnCampaign = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historysharedoncampaign/${id}`);
export const getSharedLastWeekOnCampaign = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/sharedlastweekoncampaign/${id}`);
export const getSharedTodayOnCampaignModel = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/sharedtodayoncampaignmodel/${id}`);
export const deleteCampaign = (id: string): Promise<AxiosResponse<IResponse>> => api.delete(`campaign/delete/${id}`);
export const publishCampaign = (id: string, status: boolean): Promise<AxiosResponse<IResponse>> => api.post(`campaign/publish/${id}/${status}`);


export const getLinkAffDetail = (id: string): Promise<AxiosResponse<IResponse>> => api.get(`mylinkaffdetail?id=${id}`);
export const createAffLink = (data: ICreateAffLink): Promise<AxiosResponse<ICreateAffLinkResponse>> => api.post("/afflink", data);
export const getMyAffLinks = (page: Number, filter: string, cant: Number = 50): Promise<AxiosResponse<IMyAffLinksResponse>> => api.get(`afflinks?page=${page}&cant=${cant}&filter=${filter}`);
export const getAffLinkStats = (id: string): Promise<AxiosResponse<IResponse>> => api.get(`getafflinkstats?id=${id}`);















export const getNotificationBadget = (id: Number): Promise<AxiosResponse<INotificationBadgetResponse>> => api.get(`notification/badget?id=${id}`);
export const getNotifications = (page: Number): Promise<AxiosResponse<INotificationResponse>> => api.get(`notification?page=${page}`);
export const updateNotificationBadget = (data: INotificationBadget): Promise<AxiosResponse<INotificationBadgetResponse>> => api.post("/badget", data);
export const getNotificationDetail = (id: string): Promise<AxiosResponse<INotificationDetailResponse>> => api.get(`mynotificationdetail?id=${id}`);
export const getPayoutData = (): Promise<AxiosResponse<IPayoutDataResponse>> => api.get(`payout`);
export const updatePayout = (data: IPayoutData): Promise<AxiosResponse<IResponse>> => api.post("/payout", data);
export const getSubscriptionPlans = (page: Number): Promise<AxiosResponse<ISubscriptionResponse>> => api.get(`badget?page=${page}`);
export const getSubscriptionDetail = (id: string): Promise<AxiosResponse<ISubscriptionPlanDetailResponse>> => api.get(`mysubscriptiondetail?id=${id}`);
export const changeToPlan = (id: string): Promise<AxiosResponse<IResponse>> => api.post('changetoplan', id);
export const getTransactions = (page: Number): Promise<AxiosResponse<ITransactionResponse>> => api.get(`trans?page=${page}`);
export const getTransactionDetail = (id: string): Promise<AxiosResponse<IMyTransactionDetailResponse>> => api.get(`mytransactiondetail?id=${id}`);





