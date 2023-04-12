
export interface ICampaingCard {
    id?: string,
    title: string,
    description: string,
    epm: Number,
    budget: Number,
    imageUrl: string,
    autorImageUrl: string,
    autorName: string
}

export interface IMyCampaign {
    id?: string,
    title: string,
    url: string,
    status: boolean,
    budget: Number,
    epm: Number,
    lastClick: Date,
    lastShared: Date
}

export interface IMyCampaignDetail {
    id: string,
    title: string,
    imageUrl: string,
    description: string,
    url: string,
    status: boolean,
    budget: Number,
    epm: Number,
    lastClick: Date,
    lastShared: Date
}

export interface IMyTransactionDetail {
    id: string,
    title: string,
    amount: number,
    status: string,
    created: Date,

}

export interface IMyAffLinkDetail {
    id: string,
    title: string,
    imageUrl: string,
    description: string,
    url: string,
    available: Number,
    epm: Number,
    lastClick: Date,
}

export interface IMyAffLink {
    id?: string,
    title: string,
    url: string,
    available: Number,
    lastClick: Date,
}

export interface ITransaction {
    id: number,
    title: string,
    amount: number,
    status: string,
    created: Date,
}

export interface INotification {
    id: number,
    title: string,
    message: string,
    status: string,
    created: Date,
}

export interface ISubscriptionPlan {
    id: number,
    title: string,
    price: number,
    interval: string,
    discount: number,
    inUse: boolean,
    ads: boolean,
    depositFee: number,
    payoutFee: number,
    payoutMinimun: number,
    paymentMethod: string,
    tag?: string
}


export interface ICreateCampaign {
    title: string,
    url: string,
    description: string,
    imageUrl: string,
    email: string,
    epm: Number,
}

export interface IPayoutData {
    payoutType: string,
    btcAddress?: string,
    debitCard?: string,
    paypal?: string,
    stripe?: string,
    wireName?: string,
    wireBankName?: string,
    wireSwiftorBic?: string,
    wireIban?: string,
    wireBankAddress?: string,
    wireBranch?: string,
    wireRouting?:string,
    isLockedPayoutType:boolean
}

