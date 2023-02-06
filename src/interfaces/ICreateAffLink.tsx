interface ICreateAffLinkOptions{
    Threshold:Number;
    Group:string;
}

export interface ICreateAffLink {
    SponsoredLinkId:string;
    Email: string;
    BTCAddress: string;
    Options?:ICreateAffLinkOptions;
}

export interface ICreateAffLinkResponse {
    id: string;
    link:string;
}