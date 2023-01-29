export interface ICampaingCard{
    id?:string,
    title:string,
    description:string,
    epm:string,
    budget:string,
    imageUrl:string
}

export interface ICampaignListResponse{
    page:Number,
    sponsoredLinks:ICampaingCard[],
    totalPages:Number
}