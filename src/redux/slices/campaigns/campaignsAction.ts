import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICampaign, ICreateCampaignDto, IUpdateCampaignDto } from "../../../helpers/types";
import CampaignService from "../../../api/CampaignService";

export const asyncGetCampaignsAction = createAsyncThunk(
    'campaigns/getCampaigns',
    async (query:any) => {
        const {page,limit,sort } = query;
        const response = await CampaignService.findAll(sort,limit,page);
        return response.data;
    }
);

export const asyncGetCampaignAction = createAsyncThunk(
    'campaigns/getCampaign',
    async (id: string) => {
        const response = await CampaignService.findOne(id);
        return response.data;
    }
);

export const asyncCreateCampaignAction = createAsyncThunk(
    'campaigns/createCampaign',
    async (campaign: ICreateCampaignDto) => {
        const response = await CampaignService.create(campaign as ICampaign);
        return response.data;
    }
);

export const asyncUpdateCampaignAction = createAsyncThunk(
    'campaigns/updateCampaign',
    async (campaign: IUpdateCampaignDto) => {
        const response = await CampaignService.update(campaign as ICampaign, campaign._id);
        return response.data;
    }
);

export const asyncDeleteCampaignAction = createAsyncThunk(
    'campaigns/deleteCampaign',
    async (id: string) => {
        const response = await CampaignService.delete(id);
        return response.data;
    }
);

export const asyncGetCampaignsStatisticsAction = createAsyncThunk(
    'campaigns/statistics',
    async (_, thunkAPI) => {
        try {
            let response = await CampaignService.getFullStatistics();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
); 