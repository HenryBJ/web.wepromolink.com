
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

export interface IMyAffLink{
    id?:string,
    title:string,
    url:string,
    available:Number,
    lastClick:Date,
}

export interface ITransaction{
    id:number,
    title:string,
    amount:number,
    status:string,
    created:Date,
}

export interface INotification{
    id:number,
    title:string,
    message:string,
    status:string,
    created:Date,
}


export interface ICreateCampaign{
    title:string,
    url:string,
    description:string,
    imageUrl:string,
    email:string,
    epm:Number,
}
