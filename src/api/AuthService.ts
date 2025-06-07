import instance from "./api";
import {AxiosResponse} from 'axios';
import {AuthResponse, IUser} from "../helpers/types";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return instance.post<AuthResponse>('auth/login', {email, password})
    }

    static async registration(email: string, password: string,phone:string): Promise<AxiosResponse<AuthResponse>> {
        return instance.post<AuthResponse>('auth/registration', {email, password,phone})
    }

    static async registrationGoogle(code:string): Promise<AxiosResponse<AuthResponse>> {
        return instance.post<AuthResponse>('auth/registration/google', {code})
    }
    static async check(): Promise<AxiosResponse<AuthResponse>> {
        return instance.get<AuthResponse>('auth/check')
    }

    static async settings(settings:FormData): Promise<AxiosResponse<IUser>> {
        return instance.put<IUser>('auth/settings',settings)
    }

    static async logout(): Promise<void> {
        return instance.post('auth/logout')
    }

}