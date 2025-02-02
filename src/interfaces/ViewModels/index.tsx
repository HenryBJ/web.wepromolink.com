
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
    imageUrl: string,
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

export interface ISubFeature {
    name: string,
    boolValue?: boolean,
    value?: string
}

export interface ISubscriptionPlanCard {
    id: string,
    title: string,
    monthly: number,
    annually: number,
    discount: number,
    depositFee: number,
    payoutFee: number,
    payoutMinimun: number,
    paymentMethod: string,
    tag?: string
    monthlyPaymantLink: string,
    annualyPaymantLink?: string,
    order: number,
    features?: ISubFeature[]
}

export interface ISigUpInfo {
    fullname?: string,
    email?: string,
    firebaseId: string,
    subscriptionPlanId: string,
    photoUrl: string
}

export interface IAbuseReportCampaign {
    campaignExternalId: string,
    reason:string
}
