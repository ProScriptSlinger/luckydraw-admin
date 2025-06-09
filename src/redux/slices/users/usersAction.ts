import {createAsyncThunk} from "@reduxjs/toolkit";

import UsersService from "../../../api/UsersService";

export const asyncGetUsersAction = createAsyncThunk(
    'users/all',
    async (query:any, thunkAPI)=>{
        try {
            const {page,limit,sort } = query;
            let response = await UsersService.findAll(sort,limit,page);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);


export const asyncGetUserAction = createAsyncThunk(
    'users/one',
    async (id:string, thunkAPI)=>{
        try {
            let response = await UsersService.findOne(id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);


export const asyncGetUserRolesAction = createAsyncThunk(
    'users/roles',
    async (_, thunkAPI)=>{
        try {
            let response = await UsersService.findRoles();
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncUserUpdateAction = createAsyncThunk(
    'users/update',
    async ({userID, user}:any, thunkAPI)=>{
        try {
            let response = await UsersService.update(userID,user);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);