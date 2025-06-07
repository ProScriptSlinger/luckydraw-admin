import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";

import {ICapsule} from "../../../helpers/types";

import {toast} from "react-toastify";
import {toastSetting} from "../../../helpers/scripts.ts";
import {
    asyncCreateCapsuleAction, asyncDeleteCapsuleAction,
    asyncGetCapsuleAction,
    asyncGetCapsulesAction,
    asyncUpdateCapsuleAction
} from "./capsulesAction.ts";


interface categoryState {
    capsules: ICapsule[];
    capsule: ICapsule | null;
    totalCapsules: number;
    isLoading: boolean;
    isLoadingCapsule: boolean;
    error: string
}

const initialState: categoryState = {
    capsules: [],
    capsule: null,
    totalCapsules:0,
    isLoading: false,
    isLoadingCapsule: false,
    error: ''
};


const capsulesSlice = createSlice({
    name: 'capsulesSlice',
    initialState,
    reducers: {
        resetCapsules: () => initialState,
    },
    extraReducers: (builder: ActionReducerMapBuilder<categoryState>) => {
        // Обработка asyncGetCategoriesAction
        builder
            .addCase(asyncGetCapsulesAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncGetCapsulesAction.fulfilled, (state: any, action: any) => {
                const { rows, count } = action.payload;
                state.isLoading = false;
                state.error = '';
                state.totalCapsules = count;
                state.capsules = rows//action.payload?.sort((a: any, b: any) => a.order - b.order);
            })
            .addCase(asyncGetCapsulesAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });

        // Обработка asyncGetCategoryAction
        builder
            .addCase(asyncGetCapsuleAction.pending, (state: any) => {
                state.isLoadingCategory = true;
                state.error = '';
            })
            .addCase(asyncGetCapsuleAction.fulfilled, (state: any, action: any) => {
                state.isLoadingCategory = false;
                state.error = '';
                state.capsule = action.payload;
            })
            .addCase(asyncGetCapsuleAction.rejected, (state: any, action: any) => {
                state.isLoadingCategory = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });

        // Обработка asyncUpdateCategoryAction
        builder
            .addCase(asyncUpdateCapsuleAction.pending, (state: any) => {
                state.isLoadingCapsule = true;
                state.error = '';
            })
            .addCase(asyncUpdateCapsuleAction.fulfilled, (state: any, action: any) => {
                state.isLoadingCapsule = false;
                state.error = '';
                state.capsule = action.payload;
                toast.success('Капсула обновлена!', toastSetting);
            })
            .addCase(asyncUpdateCapsuleAction.rejected, (state: any, action: any) => {
                state.isLoadingCapsule = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);

            });

        // Обработка asyncCreateCategoryAction
        builder
            .addCase(asyncCreateCapsuleAction.pending, (state: any) => {
                state.isLoadingCategory = true;
                state.error = '';
            })
            .addCase(asyncCreateCapsuleAction.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = '';
                state.capsules.push(action.payload);
                toast.success('Капсула создана!', toastSetting);
            })
            .addCase(asyncCreateCapsuleAction.rejected, (state: any, action: any) => {
                state.isLoadingCategory = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);

            });

        // Обработка asyncDeleteCategoryAction
        builder
            .addCase(asyncDeleteCapsuleAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncDeleteCapsuleAction.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = '';
                state.capsules = state.capsules.filter((item: any) => item.id !== action.payload.id);
                toast.success('Капсула удалена!', toastSetting);
            })
            .addCase(asyncDeleteCapsuleAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });
    },
});

export const {resetCapsules} = capsulesSlice.actions;
export default capsulesSlice.reducer;