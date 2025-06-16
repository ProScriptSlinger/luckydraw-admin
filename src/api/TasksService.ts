import instance from "./api";
import {AxiosResponse} from 'axios';
import {ITask} from "../helpers/types";

export default class TasksService {
    static async findAll(sort?:string, limit?:number, page?:number): Promise<AxiosResponse<any>> {
        return instance.get<ITask[]>('tasks/all', {
            params: {
                sort,
                limit,
                page
            }
        })
    }

    static async create(task:ITask): Promise<AxiosResponse<ITask>> {
        return instance.post<ITask>('tasks/', task)
    }

    static async findOne(taskID:string): Promise<AxiosResponse<ITask>> {
        return instance.get<ITask>(`tasks/${taskID}`)
    }

    static async update(task:any, taskID:string): Promise<AxiosResponse<ITask>> {
        return instance.put<ITask>(`tasks/${taskID}`, task)
    }

    static async delete(taskID:string): Promise<AxiosResponse<ITask>> {
        return instance.delete<ITask>(`tasks/${taskID}`)
    }
} 