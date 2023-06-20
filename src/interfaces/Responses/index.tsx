import { IPagination } from "../IPagination";
import { ICampaingCard, IMyAffLinkStats, IMyCampaign, IMyCampaignDetail, IMyCampaignStats, IMyTransactionDetail, INotification, INotificationBadget, IPayoutData, IStats, ISubscriptionPlanCard, ISubscriptionPlanDetail, ITransaction } from "../ViewModels";


export interface ICampaignListResponse {
    value: {
        page: Number,
        sponsoredLinks: ICampaingCard[],
        totalPages: Number
    }
}

export interface IPaginationResponse<T> {
    pagination: IPagination,
    items: T[],
}

export interface IMyCampaignDetailResponse {
    value: IMyCampaignDetail
}

export interface IMyCampaignStatsResponse {
    value: IMyCampaignStats
}

export interface IStatsResponse {
    value: IStats
}

export interface IPayoutDataResponse {
    value: IPayoutData
}

export interface INotificationResponse {
    value: {
        pagination: IPagination,
        items: INotification[]
    }
}

export interface INotificationDetailResponse {
    value: INotification
}



export interface IMyAffLinkStatsResponse {
    value: IMyAffLinkStats
}

export interface ISubscriptionResponse {
    value: {
        pagination: IPagination,
        items: ISubscriptionPlanDetail[]
    }
}

export interface ISubscriptionPlanDetailResponse {
    value: ISubscriptionPlanDetail
}


export interface IMyTransactionDetailResponse {
    value: IMyTransactionDetail
}

export interface ITransactionResponse {
    pagination: IPagination,
    items: ITransaction[]
}

export interface ICreateAffLinkResponse {
    value: {
        id: string;
        link: string;
    }
}

export interface INotificationBadgetResponse {
    value: INotificationBadget
}









