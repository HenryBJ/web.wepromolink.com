interface IcreateAffLinkOptions{
    Threshold:Number;
    Group:string;
}

export interface ICreateAffLink {
    SponsoredLinkId:string;
    Email: string;
    BTCAddress: string;
    Options?:IcreateAffLinkOptions;
}