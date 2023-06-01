
export interface IStats {
    title: string,
    labels: string[],
    data: number[][],
    dataLabels:string[]
}

export interface ICampaingCard {
    id?: string,
    title: string,
    description: string,
    epm: Number,
    budget: Number,
    imageUrl: string,
    autorImageUrl: string,
    autorName: string,
    lastModified: number
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

export interface IMyCampaignStats {
    id: string,
    title: string,
    imageUrl: string,
    todayClicks: Number,
    lastWeekClicks: Number,
    historicalClicks:IStats,
    clickByCountries:IStats,
    sharedTodayOnCampaings:Number,
    sharedLastWeekOnCampaings:Number,
    historicalShared:IStats,
    sharedByUsers:IStats    
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

export interface IMyAffLinkStats {
    id: string,
    title: string,
    imageUrl: string,
    todayClicks: Number,
    lastWeekClicks: Number,
    historicalClicks:IStats,
    clickByCountries:IStats,
    earnToday:Number,
    earnLastWeek:Number,
    historicalEarn:IStats,
    earnByCountries:IStats
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

export interface ISubscriptionPlanDetail {
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
    budget: Number,
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

export interface INotificationBadget {
    id: number,
    notification: number,
    campaing: number,
    links: number,
    clicks: number,
    deposit: number,
    withdraw: number,
    flag: string
  }

  export interface ISubscriptionPlanCard {
    id: string,
    title: string,
    monthly: number,
    annually: number,
    discount: number,
    ads: boolean,
    depositFee: number,
    payoutFee: number,
    payoutMinimun: number,
    paymentMethod: string,
    tag?: string
    monthlyPaymantLink:string,
    annualyPaymantLink?:string,
    order:number
}

export interface ISigUpInfo {
    fullname?: string,
    email?: string,
    firebaseId:string,
    subscriptionPlanId:string,
    photoUrl:string
}
