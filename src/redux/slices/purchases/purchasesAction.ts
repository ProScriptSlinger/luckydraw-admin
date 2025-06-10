import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPurchase, ICreatePurchaseDto, IUpdatePurchaseDto } from "../../../helpers/types";
import PurchaseService from "../../../api/PurchaseService";

export const asyncGetPurchasesAction = createAsyncThunk(
    'purchases/getPurchases',
    async (query: any) => {
        const { page, limit, sort } = query;
        const response = await PurchaseService.findAll(sort, limit, page);
        return response.data;
    }
);

export const asyncGetPurchaseAction = createAsyncThunk(
    'purchases/getPurchase',
    async (id: string) => {
        const response = await PurchaseService.findOne(id);
        return response.data;
    }
);

export const asyncCreatePurchaseAction = createAsyncThunk(
    'purchases/createPurchase',
    async (purchase: ICreatePurchaseDto) => {
        const response = await PurchaseService.create(purchase as IPurchase);
        return response.data;
    }
);

export const asyncUpdatePurchaseAction = createAsyncThunk(
    'purchases/updatePurchase',
    async (purchase: IUpdatePurchaseDto) => {
        const response = await PurchaseService.update(purchase as IPurchase, purchase._id);
        return response.data;
    }
);

export const asyncDeletePurchaseAction = createAsyncThunk(
    'purchases/deletePurchase',
    async (id: string) => {
        const response = await PurchaseService.delete(id);
        return response.data;
    }
);

export const asyncGetPurchasesStatisticsAction = createAsyncThunk(
    'purchases/statistics',
    async (_, thunkAPI) => {
        try {
            let response = await PurchaseService.getFullStatistics();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
); 