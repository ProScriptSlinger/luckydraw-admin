
export interface AuthResponse {
    accessToken: string;
}

export interface IUser {
    id?: number;
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
    id: number;
    title?: string;
    energy?:number;
    maxEnergy?: number;
    coins?: number;
}

export interface IParticipant {
    id: number;
    name: string;
    energy?: number;
    maxEnergy: number;
    coins: number;
    telegram_id: string;
    referralId?: string;
    invitedByReferralId?: string;
    lastDailyGift: Date;
    lastEnergyUpdate: number;
    ip?:string;
    country?: string;
    telegram_user?: string;
}




export enum NotificationType {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
}