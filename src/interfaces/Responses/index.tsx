import { IPagination } from "../IPagination";
import { ICampaingCard, IMyAffLink, IMyAffLinkDetail, IMyAffLinkStats, IMyCampaign, IMyCampaignDetail, IMyCampaignStats, IMyTransactionDetail, INotification, INotificationBadget, IPayoutData, IStats, ISubscriptionPlanCard, ISubscriptionPlanDetail, ITransaction } from "../ViewModels";

export interface IResponse {
    statusCode: number,
    contentType: string,
    value: any
}

export interface IResponseValue<T> {
    statusCode: number,
    contentType: string,
    value: T
}
export interface ICampaignListResponse extends IResponse {
    value: {
        page: Number,
        sponsoredLinks: ICampaingCard[],
        totalPages: Number
    }
}

export interface IMyCampaignsResponse extends IResponse {
    value: {
        pagination: IPagination,
        items: IMyCampaign[]
    }
}

export interface IMyCampaignDetailResponse extends IResponse {
    value: IMyCampaignDetail
}

export interface IMyCampaignStatsResponse extends IResponse {
    value: IMyCampaignStats
}

export interface IStatsResponse extends IResponse {
    value: IStats
}

export interface ISubscriptionPlanCardResponse extends IResponse {
    value: ISubscriptionPlanCard[]
}

export interface IPayoutDataResponse extends IResponse {
    value: IPayoutData
}

export interface INotificationResponse extends IResponse {
    value: {
        pagination: IPagination,
        items: INotification[]
    }
}

export interface INotificationDetailResponse extends IResponse {
    value: INotification
}

export interface IMyAffLinksResponse extends IResponse {
    value: {
        pagination: IPagination,
        items: IMyAffLink[]
    }
}

export interface IMyAffLinkDetailResponse extends IResponse {
    value: IMyAffLinkDetail
}

export interface IMyAffLinkStatsResponse extends IResponse {
    value: IMyAffLinkStats
}

export interface ISubscriptionResponse extends IResponse {
    value: {
        pagination: IPagination,
        items: ISubscriptionPlanDetail[]
    }
}

export interface ISubscriptionPlanDetailResponse extends IResponse {
    value: ISubscriptionPlanDetail
}


export interface IMyTransactionDetailResponse extends IResponse {
    value: IMyTransactionDetail
}

export interface ITransactionResponse extends IResponse {
    value: {
        pagination: IPagination,
        items: ITransaction[]
    }
}

export interface ICreateAffLinkResponse {
    value: {
        id: string;
        link: string;
    }
}

export interface INotificationBadgetResponse extends IResponse {
    value: INotificationBadget
}









