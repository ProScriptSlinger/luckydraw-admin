import instance from "./api";
import { AxiosResponse } from 'axios';
import { IPurchase } from '../helpers/types';

export default class PurchaseService {
    static async findAll(sort: string, limit: number, page: number): Promise<AxiosResponse<any>> {
        return instance.get<IPurchase[]>(`purchases`, {
            params: {
                sort,
                limit,
                page
            }
        });
    }

    static async findOne(id: string): Promise<AxiosResponse<IPurchase>> {
        return instance.get<IPurchase>(`purchases/${id}`);
    }

    static async create(purchase: IPurchase): Promise<AxiosResponse<any>> {
        return instance.post(`purchases`, purchase);
    }

    static async update(purchase: IPurchase, id: string): Promise<AxiosResponse<any>> {
        return instance.put(`purchases/${id}`, purchase);
    }

    static async delete(id: string): Promise<AxiosResponse<any>> {
        return instance.delete(`purchases/${id}`);
    }

    static async getFullStatistics(): Promise<AxiosResponse<any>> {
        return instance.get(`purchases/getFullStatistics`);
    }
} 