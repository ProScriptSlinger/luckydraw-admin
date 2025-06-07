import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";

import {
    asyncCheckAction,
    asyncLoginAction,
    asyncLogoutAction,
    asyncRegistrationGoogleAction,
    asyncSettingsAction
} from "./authAction";
import {toast} from "react-toastify";
import {toastSetting} from "../../../helpers/scripts.ts";



interface authState {
    user: any;
    isLoading: boolean;
    error: string
}

const initialState: authState = {
    user: null,
    isLoading: false,
    error: ''
};


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        loadUser: (state: any, action: any) => {
            state.user = action.payload;
        },
        logout: (state: any) => {
            state.user = null;
        },
        resetUsers: () => initialState, // Корректный сброс состояния
    },
    extraReducers: (builder: ActionReducerMapBuilder<authState>) => {
        // Обработка asyncRegistrationGoogleAction
        builder
            .addCase(asyncRegistrationGoogleAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncRegistrationGoogleAction.fulfilled, (state: any, action: any) => {
                const { user } = action.payload;
                state.isLoading = false;
                state.error = '';
                state.user = action.payload;
                toast.success('Sign up!', toastSetting);
            })
            .addCase(asyncRegistrationGoogleAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });

        // Обработка asyncLoginAction
        builder
            .addCase(asyncLoginAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncLoginAction.fulfilled, (state: any, action: any) => {
                const { user } = action.payload;
                state.isLoading = false;
                state.error = '';
                state.user = action.payload;
                toast.success('Log in!', toastSetting);
            })
            .addCase(asyncLoginAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });

        // Обработка asyncCheckAction
        builder
            .addCase(asyncCheckAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncCheckAction.fulfilled, (state: any, action: any) => {
                const { user } = action.payload;
                state.isLoading = false;
                state.error = '';
                state.user = action.payload;
            })
            .addCase(asyncCheckAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = 'Error: Cant auth'; // Сообщение об ошибке
                toast.error(action.payload, toastSetting);
            });

        // Обработка asyncSettingsAction
        builder
            .addCase(asyncSettingsAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncSettingsAction.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = '';
                state.user = action.payload;
                toast.success('Setting updated!', toastSetting);
            })
            .addCase(asyncSettingsAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });

        // Обработка asyncLogoutAction
        builder
            .addCase(asyncLogoutAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncLogoutAction.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = '';
                state.user = null;

            })
            .addCase(asyncLogoutAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });
    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;