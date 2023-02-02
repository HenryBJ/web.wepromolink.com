export interface ICampaingCard{
    id?:string,
    title:string,
    description:string,
    epm:Number,
    budget:Number,
    imageUrl:string,
    autorImageUrl:string,
    autorName:string
}

export interface ICampaignListResponse{
    page:Number,
    sponsoredLinks:ICampaingCard[],
    totalPages:Number
}