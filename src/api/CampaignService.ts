import instance from "./api";
import {AxiosResponse} from 'axios';
import { ICampaign } from '../helpers/types';

export default class CampaignService {
    static async findAll(sort: string, limit: number, page: number): Promise<AxiosResponse<any>>  {
        return instance.get<ICampaign[]>(`campaigns`, {
            params: {
                sort,
                limit,
                page
            }
        });
    }

    static async findOne(id: string): Promise<AxiosResponse<ICampaign>> {
        return instance.get<ICampaign>(`campaigns/${id}`);
    }

    static async create(campaign: ICampaign): Promise<AxiosResponse<any>> {
        return instance.post(`campaigns`, campaign);
    }

    static async update(campaign: ICampaign, id: string): Promise<AxiosResponse<any>> {
        return instance.put(`campaigns/${id}`, campaign);
    }

    static async delete(id: string): Promise<AxiosResponse<any>> {
        return instance.delete(`campaigns/${id}`);
    }

    static async getFullStatistics(): Promise<AxiosResponse<any>> {
        return instance.get(`campaigns/getFullStatistics`);
    }
}
