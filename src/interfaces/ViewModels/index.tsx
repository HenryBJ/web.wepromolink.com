
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

export interface IMyCampaign{
    id?:string,
    title:string,
    url:string,
    status:boolean,
    budget:Number,
    epm:Number,
    lastClick:Date,
    lastShared:Date
}

export interface ICreateCampaign{
    title:string,
    url:string,
    description:string,
    imageUrl:string,
    email:string,
    epm:Number,
}
