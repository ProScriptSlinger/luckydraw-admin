export interface AuthResponse {
    accessToken: string;
}

export interface IUser {
    id?: string;
    email?: string;
    password?: string;
    avatar?: string | File | FileList;
    fullName?: string;
    phone?: string;
    isBan?: boolean;
    banReason?: string;
    roles?: any[]
    role?: string;
}

export interface ICapsule {
    id: string;
    title?: string;
    balance?:number;
    tickets?: number;
    dailyStreak?: number;
}

export interface IParticipant {
    id: string;
    name: string;
    points?: number;
    tickets?: number;
    dailyStreak?: number;
    telegram_id: string;
    referralId?: string;
    invitedByReferralId?: string;
    lastDailyGift: Date;
    lastDailyReward: number;
    ip?:string;
    country?: string;
    telegram_user?: string;
}

export interface MultilingualContent {
    // en: string;
    ru: string;
    uz: string;
}

export interface ICampaign {
    _id: string;
    name: MultilingualContent;
    productName: MultilingualContent;
    productDescription: MultilingualContent;
    imageUrl: string;
    brandLogoUrl: string;
    startDate: string;
    endDate: string;
    maxParticipants?: number;
    categories?: string[];
    isPopular?: boolean;
    isNew?: boolean;
    isFinal?: boolean;
    isCoolPrize?: boolean;
    productPrice: number;
    allowDonation?: boolean;
    availableCities?: string[];
    deliveryPrices?: Record<string, number>;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICreateCampaignDto extends Omit<ICampaign, '_id' | 'createdAt' | 'updatedAt'> {}
export interface IUpdateCampaignDto extends Partial<ICreateCampaignDto> {
    _id: string;
}

export enum NotificationType {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
}

export interface IPurchase {
    _id: string;
    cartItems: Array<{
        _id: any;
        count: number;
    }>;
    userId: any;
    totalPrice: number;
    paymentMethod: 'payme' | 'click';
    status: 'pending' | 'completed' | 'failed' | 'canceled';
    isDonating: boolean;
    deliveryAddress?: {
        city: string;
        district: string;
        house: string;
        apartment: string;
        landmark: string;
    };
    paymentId?: string;
    receiptNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICreatePurchaseDto extends Omit<IPurchase, '_id' | 'createdAt' | 'updatedAt'> {}
export interface IUpdatePurchaseDto extends IPurchase {}