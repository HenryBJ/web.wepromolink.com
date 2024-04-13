import { User } from "firebase/auth"

export interface ImageBundle {
    externalId: string,
    original: string,
    originalWidth: number,
    originalHeight: number,
    originalAspectRatio: number,
    compressed: string,
    compressedWidth: number,
    compressedHeight: number,
    compressedAspectRatio: number,
    medium: string,
    mediumWidth: number,
    mediumHeight: number,
    mediumAspectRatio: number,
    thumbnail: string,
    thumbnailWidth: number,
    thumbnailHeight: number,
    thumbnailAspectRatio: number
}

export interface IStats {
    title: string,
    labels: string[],
    data: number[][],
    dataLabels: string[]
}

export interface ICampaignCard {
    id: string,
    title: string,
    description: string,
    epm: Number,
    budget: Number,
    imageBundle: ImageBundle | null,
    autorImageUrl: string,
    autorName: string,
    autorExternalId: string,
    autorVerified: boolean,
    lastModified: Date,
    unixTime:number
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
    imageBundle: ImageBundle | null,
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
    historicalClicks: IStats,
    clickByCountries: IStats,
    sharedTodayOnCampaings: Number,
    sharedLastWeekOnCampaings: Number,
    historicalShared: IStats,
    sharedByUsers: IStats
}

export interface IMyTransactionDetail {
    id: string,
    title: string,
    transactionType: string,
    amount: number,
    status: string,
    campaignName: string,
    campaignImageUrl: string,
    linkImageUrl: string,
    createdAt: Date,
    expiredAt?: Date,
    completedAt?: Date
}

export interface ILinkDetail {
    id: string,
    title: string,
    imageData: ImageBundle | null,
    description: string,
    url: string,
    profit: Number,
    status: boolean,
    epm: Number,
    lastClick: Date,
}

export interface IMyAffLinkStats {
    id: string,
    title: string,
    imageUrl: string,
    todayClicks: Number,
    lastWeekClicks: Number,
    historicalClicks: IStats,
    clickByCountries: IStats,
    earnToday: Number,
    earnLastWeek: Number,
    historicalEarn: IStats,
    earnByCountries: IStats
}

export interface IMyLink {
    id?: string,
    title: string,
    url: string,
    imageUrl: string,
    profit: Number,
    status: Boolean,
    lastClick: Date,
}

export interface ITransaction {
    id: number,
    title: string,
    amount: number,
    status: string,
    createdAt: Date,
}

export interface INotification {
    id: number,
    title: string,
    status: string,
    read: boolean,
    createdAt: Date,
}

export interface INotificationDetail {
    id: number,
    title: string,
    status: string,
    message: string,
    read: boolean,
    createdAt: Date,
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
    imageBundleId: string | null,
    email: string,
    epm: Number,
    budget: Number,
}

export interface IPaymentMethod {
    name: string,
    isVerified: boolean,
    value?: string,
}

export interface IBankAccount {
    holder: string,
    accountNumber: string,
    countryCode: string,
    accountCurrency: string,
    routingNumber?: string,
    accountType: string
}


export interface IPushNotification {
    notification: number,
    campaign: number,
    links: number,
    transaction: number,
    messages: string[],
    etag: string
}

export interface ISubFeature {
    name: string,
    boolValue?: boolean,
    value?: string,
    commingSoon: boolean,
    order:number
}

export interface ISubscriptionPlanCard {
    id: string,
    title: string,
    monthly: number,
    annually: number,
    discount: number,
    paymentMethod: string,
    tag?: string
    monthlyPriceId: string,
    annualyPriceId?: string,
    order: number,
    disabled: boolean,
    upgradeable: boolean,
    features?: ISubFeature[]
}

export interface ISigUpInfo {
    planId: string,
    user:User,
    priceId?: string,
}


export interface IAbuseReportCampaign {
    campaignExternalId: string,
    reason: string
}

export interface ISurveyQuestion {
    question: string,
    id: string,
    answers: { response: string, id: string }[]
}

export interface ISurveySummary {
    data: ISurveyQuestion[]
}