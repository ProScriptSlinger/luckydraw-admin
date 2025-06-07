import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {asyncGetUserAction, asyncGetUserRolesAction, asyncGetUsersAction, asyncUserUpdateAction} from "./usersAction";
import {IUser} from "../../../helpers/types";
import {toast} from "react-toastify";
import {toastSetting} from "../../../helpers/scripts.ts";



interface usersState {
    users: IUser[];
    totalUsers:number;
    user: any;
    rolesList:any[];
    isLoading: boolean;
    error: string
}

const initialState: usersState = {
    users: [],
    totalUsers:0,
    rolesList: [],
    user:null,
    isLoading: false,
    error: ''
};


const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        resetUsers: () => initialState, // Корректный сброс состояния
    },
    extraReducers: (builder: ActionReducerMapBuilder<any>) => {
        // Обработка asyncGetUsersAction
        builder
            .addCase(asyncGetUsersAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncGetUsersAction.fulfilled, (state: any, action: any) => {
                const { count, rows } = action.payload;
                state.isLoading = false;
                state.error = '';
                state.users = rows;
                state.totalUsers = count;
            })
            .addCase(asyncGetUsersAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Обработка asyncGetUserAction
        builder
            .addCase(asyncGetUserAction.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(asyncGetUserAction.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = '';
                state.user = action.payload;
            })
            .addCase(asyncGetUserAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Обработка asyncGetUserRolesAction
        builder
            .addCase(asyncGetUserRolesAction.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(asyncGetUserRolesAction.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = '';
                state.rolesList = action.payload;
            })
            .addCase(asyncGetUserRolesAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Обработка asyncUserUpdateAction
        builder
            .addCase(asyncUserUpdateAction.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(asyncUserUpdateAction.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = '';
                state.user = action.payload;
                toast.success('User updated!', toastSetting);
            })
            .addCase(asyncUserUpdateAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });
    },
});

export const {resetUsers} = usersSlice.actions;
export default usersSlice.reducer;