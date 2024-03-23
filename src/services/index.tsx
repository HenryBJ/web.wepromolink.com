import axios, { AxiosResponse } from "axios";
import {
    ICampaignCard,
    ICreateCampaign,
    ILinkDetail,
    IMyCampaign,
    IMyCampaignDetail,
    IMyLink,
    IMyTransactionDetail,
    INotificationDetail,
    IPaymentMethod,
    ISigUpInfo,
    IStats,
    ISubscriptionPlanCard,
    ImageBundle,
    IAbuseReportCampaign,
    IPushNotification,
    ISurveySummary,
} from "../interfaces/ViewModels";
import { INotificationResponse, IPaginationResponse, ISubscriptionPlanDetailResponse, ISubscriptionResponse, ITransactionResponse } from "../interfaces/Responses";
import AddInterceptors from "./interceptors";

export const api = AddInterceptors(axios.create({
    baseURL: process.env.REACT_APP_API_URL_WEPROMOLINK
}))

export const getStats = (collectionName: string, externalId: string): Promise<AxiosResponse<any>> => api.get(`data/${collectionName}/${externalId}`);
export const createCampaigns = (data: ICreateCampaign): Promise<AxiosResponse<string>> => api.post('campaign/create', data);
export const getCampaigns = (offset: number, limit: number, timestamp: number): Promise<AxiosResponse<ICampaignCard[]>> => api.get(`campaign/explore/${offset}/${limit}/${timestamp}`);
export const getSubscriptionCards = (): Promise<AxiosResponse<ISubscriptionPlanCard[]>> => api.get(`pricing/all`);
export const getIsEmailSignUp = (email: string): Promise<AxiosResponse<Boolean>> => api.get(`user/exits/${email}`);
export const getMyExternalId = (): Promise<AxiosResponse<string>> => api.get('user/getExternalId');
export const getIsBlocked = (): Promise<AxiosResponse<Boolean>> => api.get('user/isblocked');
export const getIsSubscribed = (): Promise<AxiosResponse<Boolean>> => api.get('user/issubscribed');
export const getDepoitFee = (): Promise<AxiosResponse<number>> => api.get('user/depositfee');
export const getWithdrawFee = (): Promise<AxiosResponse<number>> => api.get('user/withdrawfee');
export const getLevel = (): Promise<AxiosResponse<number>> => api.get('user/level');
export const signUp = (data: {fullname:string, email:string, firebaseId:string, subscriptionPlanId: string, photoUrl: string}): Promise<AxiosResponse<Boolean>> => api.post("user/signup", data);
export const checkout = (priceId: string, firebaseId: string, photoUrl: string | null): Promise<AxiosResponse<string>> => api.post("stripe/account/checkout",{priceId,firebaseId,photoUrl});
export const upgrade = (priceId: string, planId: string): Promise<AxiosResponse<string>> => api.post("stripe/account/upgrade",{priceId,planId});
export const getAvailableBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/available`);
export const getBudgetBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/budget`);
export const getPayoutBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/payout`);
export const getProfitBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/profit`);
export const getMyCampaigns = (page: Number, filter: string, cant: Number): Promise<AxiosResponse<IPaginationResponse<IMyCampaign>>> => api.get(`campaign/all/${page}/${cant}/${filter}`);
export const getCampaignDetail = (id: string): Promise<AxiosResponse<IMyCampaignDetail>> => api.get(`campaign/detail/${id}`);
export const editCampaign = (id: string, data: ICreateCampaign): Promise<AxiosResponse<void>> => api.put(`campaign/edit/${id}`, data);
export const deleteCampaign = (id: string): Promise<AxiosResponse<void>> => api.delete(`campaign/delete/${id}`);
export const publishCampaign = (id: string, status: boolean): Promise<AxiosResponse<void>> => api.post(`campaign/publish/${id}/${status}`);
export const createLink = (id: string): Promise<AxiosResponse<string>> => api.post(`link/create/${id}`, {});
export const getMyLinks = (page: Number, filter: string, cant: Number): Promise<AxiosResponse<IPaginationResponse<IMyLink>>> => api.get(`link/all/${page}/${cant}/${filter}`);
export const getLinkDetail = (id: string): Promise<AxiosResponse<ILinkDetail>> => api.get(`link/detail/${id}`);
export const createDepositBTCLink = (amount: string): Promise<AxiosResponse<string>> => api.post(`btc/invoice/${amount}`);
export const createDepositStripeLink = (amount: string): Promise<AxiosResponse<string>> => api.post(`stripe/invoice/${amount}`);
export const createWithDrawStripe = (amount: number): Promise<AxiosResponse<void>> => api.post(`stripe/withdraw/${amount}`);
export const createWithDrawBTC = (amount: number): Promise<AxiosResponse<void>> => api.post(`btc/withdraw/${amount}`);
export const getTransactions = (page: Number): Promise<AxiosResponse<ITransactionResponse>> => api.get(`transaction/get/${page}`);
export const getTransactionDetail = (id: string): Promise<AxiosResponse<IMyTransactionDetail>> => api.get(`transaction/detail/${id}`);
export const getNotifications = (page: Number): Promise<AxiosResponse<INotificationResponse>> => api.get(`notification/get/${page}`);
export const getNotificationDetail = (id: string): Promise<AxiosResponse<INotificationDetail>> => api.get(`notification/detail/${id}`);
export const deleteNotification = (id: string): Promise<AxiosResponse<any>> => api.delete(`notification/delete/${id}`);
export const markAsRead = (id: string): Promise<AxiosResponse<any>> => api.put(`notification/read/${id}`);
export const uploadImage = (data: FormData, signal: AbortSignal): Promise<AxiosResponse<string>> => api.post('image/upload', data, { signal: signal });
export const getImage = (id: string): Promise<AxiosResponse<ImageBundle>> => api.get(`image/get/${id}`);
export const getBillingData = (): Promise<AxiosResponse<IPaymentMethod[]>> => api.get('user/payment/methods');
export const verifyBTCAddress = (address: string): Promise<AxiosResponse<boolean>> => api.post(`btc/verify/${address}`);
export const connectStripe = (): Promise<AxiosResponse<string>> => api.post('stripe/account/create');
export const hasExpressStripeAccount = (): Promise<AxiosResponse<boolean>> => api.get('stripe/account/hasExpressStripe');
export const loginLinkStripe = (): Promise<AxiosResponse<string>> => api.post('stripe/account/login');
export const getPushNotification = (): Promise<AxiosResponse<IPushNotification>> => api.get("push/get");
export const getExternalId = (id: string): Promise<AxiosResponse<string>> => api.get(`profile/getid/${id}`);
export const joinWaitingList = (email: string): Promise<AxiosResponse<void>> => api.post('marketing/join', { email: email });
export const getSurvey = (): Promise<AxiosResponse<ISurveySummary>> => api.get('marketing/surveysummary');
export const addSurveyDatapoint = (question: string, answer: string): Promise<AxiosResponse<void>> => api.post('marketing/datapoint', { question, answer });


export const updatePayout = (data: IPaymentMethod): Promise<AxiosResponse<void>> => api.post("/payout", data);
export const getSubscriptionPlans = (page: Number): Promise<AxiosResponse<ISubscriptionResponse>> => api.get(`badget?page=${page}`);
export const getSubscriptionDetail = (id: string): Promise<AxiosResponse<ISubscriptionPlanDetailResponse>> => api.get(`mysubscriptiondetail?id=${id}`);
export const changeToPlan = (id: string): Promise<AxiosResponse<void>> => api.post('changetoplan', id);

export const abuseReportCampaigns = (data: IAbuseReportCampaign): Promise<AxiosResponse<string>> => api.post('campaign/report-abuse', data);







