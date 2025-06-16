import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITask} from "../../../helpers/types";
import TasksService from "../../../api/TasksService";

export const asyncGetTasksAction = createAsyncThunk(
    'tasks/all',
    async (query:any, thunkAPI)=>{
        try {
            const {page, limit, sort} = query;
            let response = await TasksService.findAll(sort, limit, page);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncGetTaskAction = createAsyncThunk(
    'tasks/one',
    async (id:string, thunkAPI)=>{
        try {
            let response = await TasksService.findOne(id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncCreateTaskAction = createAsyncThunk(
    'tasks/create',
    async (task:ITask, thunkAPI)=>{
        try {
            let response = await TasksService.create(task);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncUpdateTaskAction = createAsyncThunk(
    'tasks/update',
    async (task:ITask, thunkAPI)=>{
        try {
            const {_id, ...taskData} = task;
            let response = await TasksService.update(taskData, _id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncDeleteTaskAction = createAsyncThunk(
    'tasks/delete',
    async (id:string, thunkAPI)=>{
        try {
            let response = await TasksService.delete(id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
); 