import instance from "./api";
import {AxiosResponse} from 'axios';
import {ICapsule, IParticipant} from "../helpers/types";

export default class ParticipantsService {
    static async findAll(sort?:string,limit?:number,page?:number): Promise<AxiosResponse<any>> {
        return instance.get<IParticipant[]>('participants',{
            params: {
                sort,
                limit,
                page
            }
        })
    }

    static async getFullStatistics(): Promise<AxiosResponse<any>> {
        return instance.get<IParticipant[]>('participants/getFullStatistics')
    }

    static async findOne(participantID:number): Promise<AxiosResponse<IParticipant>> {
        return instance.get<IParticipant>(`participants/${participantID}` )
    }


    static async update(category:any,participantID:number): Promise<AxiosResponse<IParticipant>> {
        return instance.put<IParticipant>(`participants/${participantID}`,category)
    }

    static async delete(participantID:number): Promise<AxiosResponse<IParticipant>> {
        return instance.delete<IParticipant>(`participants/${participantID}`)
    }
}