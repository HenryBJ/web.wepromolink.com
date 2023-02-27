import { IPagination } from "../IPagination";
import { ICampaingCard, IMyAffLink, IMyCampaign, ITransaction } from "../ViewModels";

export interface ICampaignListResponse {
    page: Number,
    sponsoredLinks: ICampaingCard[],
    totalPages: Number
}

export interface ICreateAffLinkResponse {
    id: string;
    link: string;
}

export interface IMyCampaignsResponse {
    pagination: IPagination,
    items: IMyCampaign[]
}

export interface IMyAffLinksResponse {
    pagination: IPagination,
    items: IMyAffLink[]
}

export interface ITransactionResponse {
    pagination: IPagination,
    items: ITransaction[]
}


