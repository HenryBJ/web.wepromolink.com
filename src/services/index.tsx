import axios, { AxiosResponse } from "axios";
import {
    ICampaignCard,
    ICreateCampaign,
    ILinkDetail,
    IMyCampaign,
    IMyCampaignDetail,
    IMyLink,
    IMyTransactionDetail,
    INotificationBadget,
    INotificationDetail,
    IPaymentMethod,
    ISigUpInfo,
    IStats,
    ISubscriptionPlanCard,
    ImageBundle,
    IAbuseReportCampaign
} from "../interfaces/ViewModels";
import { INotificationBadgetResponse, INotificationResponse, IPaginationResponse, ISubscriptionPlanDetailResponse, ISubscriptionResponse, ITransactionResponse } from "../interfaces/Responses";
import AddInterceptors from "./interceptors";

export const api = AddInterceptors(axios.create({
    baseURL: process.env.REACT_APP_API_URL_WEPROMOLINK
}))


export const createCampaigns = (data: ICreateCampaign): Promise<AxiosResponse<string>> => api.post('campaign/create', data);
export const getCampaigns = (offset: number, limit: number, timestamp: number): Promise<AxiosResponse<ICampaignCard[]>> => api.get(`campaign/explore/${offset}/${limit}/${timestamp}`);
export const getSubscriptionCards = (): Promise<AxiosResponse<ISubscriptionPlanCard[]>> => api.get(`pricing/all`);
export const getIsEmailSignUp = (email: string): Promise<AxiosResponse<Boolean>> => api.get(`user/exits/${email}`);
export const getIsBlocked = (): Promise<AxiosResponse<Boolean>> => api.get('user/isblocked');
export const getIsSubscribed = (): Promise<AxiosResponse<Boolean>> => api.get('user/issubscribed');
export const putFirebaseUid = (email: string, uid: string): Promise<AxiosResponse<void>> => api.put('user/firebaseuid', { email, uid });
export const signUp = (data: ISigUpInfo): Promise<AxiosResponse<Boolean>> => api.post("user/signup", data);
export const getAvailableBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/available`);
export const getBudgetBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/budget`);
export const getLockedBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/locked`);
export const getPayoutBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/payout`);
export const getProfitBalanceData = (): Promise<AxiosResponse<Number>> => api.get(`data/profit`);
export const getEarnTodayData = (): Promise<AxiosResponse<Number>> => api.get(`data/earntoday`);
export const getEarnLastWeekData = (): Promise<AxiosResponse<Number>> => api.get(`data/earnlastweek`);
export const getClicksTodayOnLinkData = (): Promise<AxiosResponse<Number>> => api.get(`data/clickstodayonlinks`);
export const getClicksLastWeekOnLinkData = (): Promise<AxiosResponse<Number>> => api.get(`data/clickslastweekonlinks`);
export const getClicksTodayOnCompaignData = (): Promise<AxiosResponse<Number>> => api.get(`data/clickstodayoncampaigns`);
export const getClicksLastWeekOnCompaignData = (): Promise<AxiosResponse<Number>> => api.get(`data/clickslastweekoncampaigns`);
export const getSharedTodayData = (): Promise<AxiosResponse<Number>> => api.get(`data/sharedtoday`);
export const getSharedLastWeekData = (): Promise<AxiosResponse<Number>> => api.get(`data/sharedlastweek`);
export const getHistoricalClickOnLinks = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclicksonlink`);
export const getHistoricalEarnOnLinks = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalearnonlink`);
export const getHistoricalClickOnCampaigns = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclickoncampaigns`);
export const getHistoricalClickOnShares = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclickonshares`);
export const getClickOnLinksByCountries = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclickbycountriesonlinks`);
export const getEarnByCountries = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalearnbycountries`);
export const getClickOnCampaignsByCountries = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalclickbycountriesoncampaigns`);
export const getSharedByUsers = (): Promise<AxiosResponse<IStats>> => api.get(`data/historicalsharedbyusers`);
export const getMyCampaigns = (page: Number, filter: string, cant: Number): Promise<AxiosResponse<IPaginationResponse<IMyCampaign>>> => api.get(`campaign/all/${page}/${cant}/${filter}`);
export const getCampaignDetail = (id: string): Promise<AxiosResponse<IMyCampaignDetail>> => api.get(`campaign/detail/${id}`);
export const editCampaign = (id: string, data: ICreateCampaign): Promise<AxiosResponse<void>> => api.put(`campaign/edit/${id}`, data);
export const getClicksLastWeekOnCampaign = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/clickslastweekoncampaign/${id}`);
export const getClicksTodayOnCampaign = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/clickstodayoncampaign/${id}`);
export const getHistoryClicksByCountriesOnCampaign = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historyclicksbycountriesoncampaign/${id}`);
export const getHistoryClicksOnCampaign = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historyclicksoncampaign/${id}`);
export const getHistorySharedByUsersOnCampaign = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historysharedbyusersoncampaign/${id}`);
export const getHistorySharedOnCampaign = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historysharedoncampaign/${id}`);
export const getSharedLastWeekOnCampaign = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/sharedlastweekoncampaign/${id}`);
export const getSharedTodayOnCampaignModel = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/sharedtodayoncampaignmodel/${id}`);
export const deleteCampaign = (id: string): Promise<AxiosResponse<void>> => api.delete(`campaign/delete/${id}`);
export const publishCampaign = (id: string, status: boolean): Promise<AxiosResponse<void>> => api.post(`campaign/publish/${id}/${status}`);
export const createLink = (id: string): Promise<AxiosResponse<string>> => api.post(`link/create/${id}`, {});
export const getMyLinks = (page: Number, filter: string, cant: Number): Promise<AxiosResponse<IPaginationResponse<IMyLink>>> => api.get(`link/all/${page}/${cant}/${filter}`);
export const getLinkDetail = (id: string): Promise<AxiosResponse<ILinkDetail>> => api.get(`link/detail/${id}`);
export const getClicksLastWeekOnLink = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/clickslastweekonlink/${id}`);
export const getClicksTodayOnLink = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/clickstodayonlink/${id}`);
export const getEarnLastWeekOnLink = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/earnlastweekonlink/${id}`);
export const getEarnTodayOnLink = (id: string): Promise<AxiosResponse<Number>> => api.get(`data/earntodayonlink/${id}`);
export const getHistoryClicksByCountriesOnLink = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historyclicksbycountriesonlink/${id}`);
export const getHistoryEarnByCountriesOnLink = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historyearnbycountriesonlink/${id}`);
export const getHistoryEarnOnLink = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historyearnonlink/${id}`);
export const getHistoryClicksOnLink = (id: string): Promise<AxiosResponse<IStats>> => api.get(`data/historyclicksonlink/${id}`);
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
export const hasVerifiedStripeAccount = (): Promise<AxiosResponse<boolean>> => api.get('stripe/account/isverified');
export const loginLinkStripe = (): Promise<AxiosResponse<string>> => api.post('stripe/account/login');



export const getNotificationBadget = (id: Number): Promise<AxiosResponse<INotificationBadgetResponse>> => api.get(`notification/badget?id=${id}`);

export const updateNotificationBadget = (data: INotificationBadget): Promise<AxiosResponse<INotificationBadgetResponse>> => api.post("/badget", data);


export const updatePayout = (data: IPaymentMethod): Promise<AxiosResponse<void>> => api.post("/payout", data);
export const getSubscriptionPlans = (page: Number): Promise<AxiosResponse<ISubscriptionResponse>> => api.get(`badget?page=${page}`);
export const getSubscriptionDetail = (id: string): Promise<AxiosResponse<ISubscriptionPlanDetailResponse>> => api.get(`mysubscriptiondetail?id=${id}`);
export const changeToPlan = (id: string): Promise<AxiosResponse<void>> => api.post('changetoplan', id);

export const abuseReportCampaigns = (data: IAbuseReportCampaign): Promise<AxiosResponse<string>> => api.post('campaign/report-abuse', data);







