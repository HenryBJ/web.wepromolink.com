import { IPagination } from "../IPagination";
import { ICampaingCard, IMyCampaign } from "../ViewModels";

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