import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICapsule, IParticipant} from "../../../helpers/types.ts";
import ParticipantsService from "../../../api/PaticipantsService.ts";


export const asyncGetParticipantsStatisticsAction = createAsyncThunk(
    'participants/statistics',
    async (_, thunkAPI)=>{
        try {
            let response = await ParticipantsService.getFullStatistics();
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncGetParticipantsAction = createAsyncThunk(
    'participants/all',
    async (query:any, thunkAPI)=>{
        try {
            const {page,limit,sort } = query;
            let response = await ParticipantsService.findAll(sort,limit,page);
            return response.data //.reverse();
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);
export const asyncGetParticipantAction = createAsyncThunk(
    'participants/one',
    async (id:string, thunkAPI)=>{
        try {
            let response = await ParticipantsService.findOne(id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);


export const asyncUpdateParticipantAction = createAsyncThunk(
    'participants/update',
    async (category:IParticipant, thunkAPI)=>{
        try {
            const {id,name,points,tickets,dailyStreak} = category;

            const participant = {
                name,
                points:Number(points),
                tickets:Number(tickets),
                dailyStreak:Number(dailyStreak)
            }

            let response = await ParticipantsService.update(participant, id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncDeleteParticipantAction = createAsyncThunk(
    'participants/delete',
    async (id:string, thunkAPI)=>{
        try {
            let response = await ParticipantsService.delete(id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);
