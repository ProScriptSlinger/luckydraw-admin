import instance from "./api";
import {AxiosResponse} from 'axios';
import { IUser} from "../helpers/types";

export default class UsersService {
    static async findAll(sort?:string,limit?:number,page?:number): Promise<AxiosResponse<any>> {
        return instance.get<IUser[]>('users',
            {
                params: {
                    sort,
                    limit,
                    page
                }
            })
    }

    static async findOne(userID:number): Promise<AxiosResponse<any>> {
        return instance.get<IUser[]>(`users/${userID}` )
    }

    static async findRoles(): Promise<AxiosResponse<any>> {
        return instance.get<IUser[]>(`users/roles` )
    }

    static async update(userID:number,settings:any): Promise<AxiosResponse<any>> {
        return instance.put<IUser[]>(`users/${userID}`,settings )
    }

}