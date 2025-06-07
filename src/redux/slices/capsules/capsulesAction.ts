import {createAsyncThunk} from "@reduxjs/toolkit";
import CapsulesService from "../../../api/CapsulesService.ts";
import {ICapsule} from "../../../helpers/types.ts";


export const asyncGetCapsulesAction = createAsyncThunk(
    'capsules/all',
    async (query:any, thunkAPI)=>{
        try {
            const {page,limit,sort } = query;
            let response = await CapsulesService.findAll(sort,limit,page);
            return response.data //.reverse();
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);
export const asyncGetCapsuleAction = createAsyncThunk(
    'capsules/one',
    async (id:number, thunkAPI)=>{
        try {
            let response = await CapsulesService.findOne(id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncCreateCapsuleAction = createAsyncThunk(
    'capsules/create',
    async (category:ICapsule, thunkAPI)=>{
        try {
            const {title,energy,maxEnergy,coins} = category;

            const newCapsule = {
                title,
                energy: Number(energy),
                maxEnergy: Number(maxEnergy),
                coins: Number(coins)
            }

            let response = await CapsulesService.create(newCapsule);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncUpdateCapsuleAction = createAsyncThunk(
    'categories/update',
    async (category:ICapsule, thunkAPI)=>{
        try {
            const {id,title,energy,maxEnergy,coins} = category;

            const newCapsule = {
                title,
                energy: Number(energy),
                maxEnergy: Number(maxEnergy),
                coins: Number(coins)
            }

            let response = await CapsulesService.update(newCapsule, id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncDeleteCapsuleAction = createAsyncThunk(
    'categories/delete',
    async (id:number, thunkAPI)=>{
        try {
            let response = await CapsulesService.delete(id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);
