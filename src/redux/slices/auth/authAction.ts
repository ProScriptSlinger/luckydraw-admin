import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../../api/AuthService";
import { resetUsers } from "../users/usersSlice";
import {resetParticipants} from "../participants/participantsSlice.ts";


export const asyncLoginAction = createAsyncThunk(
    'account/login',
    async (userSent:any, thunkAPI)=>{
        try {
            const {email,password} = userSent;
            let response = await AuthService.login(email, password);
            const {user}:any = response.data;
            const roles = user?.roles?.map((item:any)=>item.title).includes('ADMIN');
            if(roles){
                localStorage.setItem('token', response.data.accessToken);
                return response.data;
            }
            return thunkAPI.rejectWithValue("Error: Cant auth in admin")
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncRegistrationGoogleAction = createAsyncThunk(
    'account/registrationGoogle',
    async (userSent:any, thunkAPI)=>{
        try {

            const {code,email,family_name,given_name} = userSent;
            let response = await AuthService.registrationGoogle(code);
            const {user}:any = response.data;
            const roles = user?.roles?.map((item:any)=>item.title).includes('ADMIN');
            if(roles){
                localStorage.setItem('token', response.data.accessToken);
                return response.data;
            }
          //  console.log('registrationGoogle',response)
            return thunkAPI.rejectWithValue("Error: Cant auth in admin")
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);


export const asyncRegistrationAction = createAsyncThunk(
    'account/register',
    async (userSent:any, thunkAPI)=>{
        try {
            const {email,password,phone} = userSent;
            let response = await AuthService.registration(email, password,phone);
            const {user}:any = response.data;
            const roles = user?.roles?.map((item:any)=>item.title).includes('ADMIN');
            if(roles){
                localStorage.setItem('token', response.data.accessToken);
                return response.data;
            }
            return thunkAPI.rejectWithValue("Error: Cant auth in admin")
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);


export const asyncCheckAction = createAsyncThunk(
    'account/check',
    async (_, thunkAPI)=>{
        try {
            let response = await AuthService.check();
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncSettingsAction = createAsyncThunk(
    'account/settings',
    async (settings:FormData, thunkAPI)=>{
        try {
            let response = await AuthService.settings(settings);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncLogoutAction = createAsyncThunk(
    'account/logout',
    async (_, thunkAPI)=>{
        try {
            let response = await AuthService.logout();
            localStorage.removeItem('token');
            thunkAPI.dispatch(resetUsers());
            thunkAPI.dispatch(resetParticipants());
            return response;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);