import instance from "./api";
import {AxiosResponse} from 'axios';
import {ICapsule} from "../helpers/types";

export default class CapsulesService {
    static async findAll(sort?:string,limit?:number,page?:number): Promise<AxiosResponse<any>> {
        return instance.get<ICapsule[]>('capsules',{
            params: {
                sort,
                limit,
                page
            }
        })
    }

    static async findOne(categoryID:number): Promise<AxiosResponse<ICapsule>> {
        return instance.get<ICapsule>(`capsules/${categoryID}` )
    }

    static async create(category:any): Promise<AxiosResponse<ICapsule>> {
        return instance.post<ICapsule>(`capsules`,category)
    }

    static async update(category:any,categoryID:number): Promise<AxiosResponse<ICapsule>> {
        return instance.put<ICapsule>(`capsules/${categoryID}`,category)
    }

    static async delete(categoryID:number): Promise<AxiosResponse<ICapsule>> {
        return instance.delete<ICapsule>(`capsules/${categoryID}`)
    }
}