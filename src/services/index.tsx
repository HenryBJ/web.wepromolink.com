import axios, { AxiosResponse } from "axios";
import { ICreateCampaign, INotificationBadget, IPayoutData, ISigUpInfo } from "../interfaces/ViewModels";
import { ICampaignListResponse, ICreateAffLinkResponse, IMyAffLinksResponse, IMyCampaignDetailResponse, IMyCampaignsResponse, IMyTransactionDetailResponse, INotificationBadgetResponse, INotificationDetailResponse, INotificationResponse, IPayoutDataResponse, IResponse, IResponseValue, ISubscriptionPlanCardResponse, ISubscriptionPlanDetailResponse, ISubscriptionResponse, ITransactionResponse } from "../interfaces/Responses";
import { ICreateAffLink } from "../interfaces/Request";
import AddInterceptors from "./interceptors";

export const api = AddInterceptors(axios.create({
    baseURL: process.env.REACT_APP_API_URL_WEPROMOLINK
}))

// const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL_WEPROMOLINK
// })

export const createCampaigns = (data:ICreateCampaign):Promise<AxiosResponse<IResponse>> => api.post('campaign/create', data);
export const getCampaigns = (page:Number):Promise<AxiosResponse<ICampaignListResponse>> => api.get(`links?page=${page}`);
export const getSubscriptionCards = ():Promise<AxiosResponse<ISubscriptionPlanCardResponse>> => api.get(`pricing/all`);
export const getIsEmailSignUp = (email: string):Promise<AxiosResponse<IResponse>> => api.get(`user/exits/${email}`);
export const getIsBlocked = ():Promise<AxiosResponse<IResponse>> => api.get('user/isblocked');
export const getIsSubscribed = ():Promise<AxiosResponse<IResponseValue<Boolean>>> => api.get('user/issubscribed');
export const putFirebaseUid = (email:string, uid:string):Promise<AxiosResponse<IResponse>> => api.put('user/firebaseuid', {email, uid});
export const signUp = (data: ISigUpInfo):Promise<AxiosResponse<IResponseValue<Boolean>>> => api.post("user/signup", data);

export const getAvailableBalanceData = ():Promise<AxiosResponse<IResponseValue<Number>>> => api.get(`data/available`);

export const getMyCampaigns = (page: Number, filter: string, cant: Number = 50):Promise<AxiosResponse<IMyCampaignsResponse>> => api.get(`campaign/all/${page}/${cant}/${filter}`);
export const getCampaignDetail = (id: string):Promise<AxiosResponse<IMyCampaignDetailResponse>> => api.get(`mycampaigndetail?id=${id}`);
export const getLinkAffDetail = (id: string):Promise<AxiosResponse<IResponse>> => api.get(`mylinkaffdetail?id=${id}`);
export const editCampaign = (id:string, data: ICreateCampaign):Promise<AxiosResponse<IResponse>> => api.post("editcampaign", {id, data});
export const getCampaignStats = (id: string):Promise<AxiosResponse<IResponse>> => api.get(`mycampaigndetail?id=${id}`);
export const publishCampaign = (id: string):Promise<AxiosResponse<IResponse>> => api.post('publishcampaign', id);
export const unpublishCampaign = (id: string):Promise<AxiosResponse<IResponse>> => api.post('unpublishcampaign', id);
export const createAffLink = (data: ICreateAffLink):Promise<AxiosResponse<ICreateAffLinkResponse>> => api.post("/afflink", data);
export const getMyAffLinks = (page:Number, filter:string, cant:Number=50):Promise<AxiosResponse<IMyAffLinksResponse>> => api.get(`afflinks?page=${page}&cant=${cant}&filter=${filter}`);
export const getAffLinkStats = (id: string):Promise<AxiosResponse<IResponse>> => api.get(`getafflinkstats?id=${id}`);
export const getHistoricalClickOnLinks = ():Promise<AxiosResponse<IResponse>> => api.get(`gethistoricalclickonlink`);
export const getHistoricalEarnOnLinks = ():Promise<AxiosResponse<IResponse>> => api.get(`gethistoricalearnonlink`);
export const getHistoricalClickOnCampaigns = ():Promise<AxiosResponse<IResponse>> => api.get(`gethistoricalearnoncampaigns`);
export const getHistoricalClickOnShares = ():Promise<AxiosResponse<IResponse>> => api.get(`gethistoricalearnonshares`);
export const getClickOnLinksByCountries = ():Promise<AxiosResponse<IResponse>> => api.get(`getbarsclickonlinksbycountries`);
export const getEarnByCountries = ():Promise<AxiosResponse<IResponse>> => api.get(`getearnbycountries`);
export const getClickOnCampaignsByCountries = ():Promise<AxiosResponse<IResponse>> => api.get(`getclickoncampaignsbycountries`);
export const getSharedByUsers = ():Promise<AxiosResponse<IResponse>> => api.get(`getsharedbyusers`);
export const getEarnTodayData = ():Promise<AxiosResponse<IResponse>> => api.get(`getearntoday`);
export const getEarnLastWeekData = ():Promise<AxiosResponse<IResponse>> => api.get(`getearnlastweekdata`);
export const getClicksTodayOnLinkData = ():Promise<AxiosResponse<IResponse>> => api.get(`getclickstodayonlinkdata`);
export const getClicksLastWeekOnLinkData = ():Promise<AxiosResponse<IResponse>> => api.get(`getclickslastweekonlinkdata`);
export const getClicksTodayOnCompaignData = ():Promise<AxiosResponse<IResponse>> => api.get(`getclickstodayoncompaingdata`);
export const getClicksLastWeekOnCompaignData = ():Promise<AxiosResponse<IResponse>> => api.get(`getclickslastweekoncompaingdata`);
export const getSharedTodayData = ():Promise<AxiosResponse<IResponse>> => api.get(`getsharedtodaydata`);
export const getSharedLastWeekData = ():Promise<AxiosResponse<IResponse>> => api.get(`getsharedlastweekdata`);
export const getNotificationBadget = (id:Number):Promise<AxiosResponse<INotificationBadgetResponse>> => api.get(`notification/badget?id=${id}`);
export const getNotifications = (page:Number):Promise<AxiosResponse<INotificationResponse>> => api.get(`notification?page=${page}`);
export const updateNotificationBadget = (data: INotificationBadget):Promise<AxiosResponse<INotificationBadgetResponse>> => api.post("/badget", data);
export const getNotificationDetail = (id: string):Promise<AxiosResponse<INotificationDetailResponse>> => api.get(`mynotificationdetail?id=${id}`);
export const getPayoutData = ():Promise<AxiosResponse<IPayoutDataResponse>> => api.get(`payout`);
export const updatePayout = (data: IPayoutData):Promise<AxiosResponse<IResponse>> => api.post("/payout", data);
export const getSubscriptionPlans = (page:Number):Promise<AxiosResponse<ISubscriptionResponse>> => api.get(`badget?page=${page}`);
export const getSubscriptionDetail = (id: string):Promise<AxiosResponse<ISubscriptionPlanDetailResponse>> => api.get(`mysubscriptiondetail?id=${id}`);
export const changeToPlan = (id: string):Promise<AxiosResponse<IResponse>> => api.post('changetoplan',id);
export const getTransactions = (page:Number):Promise<AxiosResponse<ITransactionResponse>> => api.get(`trans?page=${page}`);
export const getTransactionDetail = (id: string):Promise<AxiosResponse<IMyTransactionDetailResponse>> => api.get(`mytransactiondetail?id=${id}`);

export const getBudgetBalanceData = ():Promise<AxiosResponse<IResponse>> => api.get(`mybudgetbalance`);
export const getLockedBalanceData = ():Promise<AxiosResponse<IResponse>> => api.get(`mylockedbalance`);
export const getProfitBalanceData = ():Promise<AxiosResponse<IResponse>> => api.get(`myprofitbalance`);
export const getPayoutBalanceData = ():Promise<AxiosResponse<IResponse>> => api.get(`mypayoybalance`);
