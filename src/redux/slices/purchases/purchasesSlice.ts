import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { IPurchase } from "../../../helpers/types";
import { toast } from "react-toastify";
import { toastSetting } from "../../../helpers/scripts";
import {
    asyncGetPurchasesAction,
    asyncGetPurchaseAction,
    asyncUpdatePurchaseAction,
    asyncCreatePurchaseAction,
    asyncDeletePurchaseAction,
    asyncGetPurchasesStatisticsAction
} from "./purchasesAction";

interface PurchaseState {
    purchases: IPurchase[];
    purchase: IPurchase | null;
    totalPurchases: number;
    isLoading: boolean;
    isLoadingPurchase: boolean;
    error: string;
    purchasesStatistics: any;
}

const initialState: PurchaseState = {
    purchases: [],
    purchase: null,
    totalPurchases: 0,
    isLoading: false,
    isLoadingPurchase: false,
    error: '',
    purchasesStatistics: null
};

const purchasesSlice = createSlice({
    name: 'purchasesSlice',
    initialState,
    reducers: {
        resetPurchases: () => initialState,
    },
    extraReducers: (builder: ActionReducerMapBuilder<PurchaseState>) => {
        // Get all purchases
        builder
            .addCase(asyncGetPurchasesAction.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncGetPurchasesAction.fulfilled, (state, action) => {
                const { rows, count } = action.payload;
                state.isLoading = false;
                state.error = '';
                state.totalPurchases = count;
                state.purchases = rows;
            })
            .addCase(asyncGetPurchasesAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Get single purchase
        builder
            .addCase(asyncGetPurchaseAction.pending, (state) => {
                state.isLoadingPurchase = true;
                state.error = '';
            })
            .addCase(asyncGetPurchaseAction.fulfilled, (state, action) => {
                state.isLoadingPurchase = false;
                state.error = '';
                state.purchase = action.payload;
            })
            .addCase(asyncGetPurchaseAction.rejected, (state, action) => {
                state.isLoadingPurchase = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Update purchase
        builder
            .addCase(asyncUpdatePurchaseAction.pending, (state) => {
                state.isLoadingPurchase = true;
                state.error = '';
            })
            .addCase(asyncUpdatePurchaseAction.fulfilled, (state, action) => {
                state.isLoadingPurchase = false;
                state.error = '';
                state.purchase = action.payload;
                toast.success('Purchase updated!', toastSetting);
            })
            .addCase(asyncUpdatePurchaseAction.rejected, (state, action) => {
                state.isLoadingPurchase = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Create purchase
        builder
            .addCase(asyncCreatePurchaseAction.pending, (state) => {
                state.isLoadingPurchase = true;
                state.error = '';
            })
            .addCase(asyncCreatePurchaseAction.fulfilled, (state, action) => {
                state.isLoadingPurchase = false;
                state.error = '';
                state.purchases.push(action.payload);
                toast.success('Purchase created!', toastSetting);
            })
            .addCase(asyncCreatePurchaseAction.rejected, (state, action) => {
                state.isLoadingPurchase = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Delete purchase
        builder
            .addCase(asyncDeletePurchaseAction.pending, (state) => {
                state.isLoadingPurchase = true;
                state.error = '';
            })
            .addCase(asyncDeletePurchaseAction.fulfilled, (state, action) => {
                state.isLoadingPurchase = false;
                state.error = '';
                state.purchases = state.purchases.filter(p => p._id !== action.payload._id);
                toast.success('Purchase deleted!', toastSetting);
            })
            .addCase(asyncDeletePurchaseAction.rejected, (state, action) => {
                state.isLoadingPurchase = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Get purchases statistics
        builder
            .addCase(asyncGetPurchasesStatisticsAction.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncGetPurchasesStatisticsAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.purchasesStatistics = action.payload;
            })
            .addCase(asyncGetPurchasesStatisticsAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

    },
});

export const { resetPurchases } = purchasesSlice.actions;
export default purchasesSlice.reducer; 