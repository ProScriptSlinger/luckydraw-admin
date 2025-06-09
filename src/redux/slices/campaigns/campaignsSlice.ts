import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { ICampaign } from "../../../helpers/types";
import { toast } from "react-toastify";
import { toastSetting } from "../../../helpers/scripts";
import {
    asyncCreateCampaignAction,
    asyncDeleteCampaignAction,
    asyncGetCampaignAction,
    asyncGetCampaignsAction,
    asyncGetCampaignsStatisticsAction,
    asyncUpdateCampaignAction
} from "./campaignsAction";

interface CampaignState {
    campaigns: ICampaign[];
    campaign: ICampaign | null;
    totalCampaigns: number;
    isLoading: boolean;
    isLoadingCampaign: boolean;
    error: string;
    campaignsStatistics: any;
}

const initialState: CampaignState = {
    campaigns: [],
    campaign: null,
    totalCampaigns: 0,
    isLoading: false,
    isLoadingCampaign: false,
    error: '',
    campaignsStatistics: null
};

const campaignsSlice = createSlice({
    name: 'campaignsSlice',
    initialState,
    reducers: {
        resetCampaigns: () => initialState,
    },
    extraReducers: (builder: ActionReducerMapBuilder<CampaignState>) => {
        // Get all campaigns
        builder
            .addCase(asyncGetCampaignsAction.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncGetCampaignsAction.fulfilled, (state, action) => {
                const { rows, count } = action.payload;
                state.isLoading = false;
                state.error = '';
                state.totalCampaigns = count;
                state.campaigns = rows;
            })
            .addCase(asyncGetCampaignsAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Get single campaign
        builder
            .addCase(asyncGetCampaignAction.pending, (state) => {
                state.isLoadingCampaign = true;
                state.error = '';
            })
            .addCase(asyncGetCampaignAction.fulfilled, (state, action) => {
                state.isLoadingCampaign = false;
                state.error = '';
                state.campaign = action.payload;
            })
            .addCase(asyncGetCampaignAction.rejected, (state, action) => {
                state.isLoadingCampaign = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Update campaign
        builder
            .addCase(asyncUpdateCampaignAction.pending, (state) => {
                state.isLoadingCampaign = true;
                state.error = '';
            })
            .addCase(asyncUpdateCampaignAction.fulfilled, (state, action) => {
                state.isLoadingCampaign = false;
                state.error = '';
                state.campaign = action.payload;
                toast.success('Campaign updated!', toastSetting);
            })
            .addCase(asyncUpdateCampaignAction.rejected, (state, action) => {
                state.isLoadingCampaign = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Create campaign
        builder
            .addCase(asyncCreateCampaignAction.pending, (state) => {
                state.isLoadingCampaign = true;
                state.error = '';
            })
            .addCase(asyncCreateCampaignAction.fulfilled, (state, action) => {
                state.isLoadingCampaign = false;
                state.error = '';
                state.campaigns.push(action.payload);
                toast.success('Campaign created!', toastSetting);
            })
            .addCase(asyncCreateCampaignAction.rejected, (state, action) => {
                state.isLoadingCampaign = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Delete campaign
        builder
            .addCase(asyncDeleteCampaignAction.pending, (state) => {
                state.isLoadingCampaign = true;
                state.error = '';
            })
            .addCase(asyncDeleteCampaignAction.fulfilled, (state, action) => {
                state.isLoadingCampaign = false;
                state.error = '';
                state.campaigns = state.campaigns.filter(c => c._id !== action.payload._id);
                toast.success('Campaign deleted!', toastSetting);
            })
            .addCase(asyncDeleteCampaignAction.rejected, (state, action) => {
                state.isLoadingCampaign = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        // Get campaigns statistics
        builder
            .addCase(asyncGetCampaignsStatisticsAction.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncGetCampaignsStatisticsAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.campaignsStatistics = action.payload;
            })
            .addCase(asyncGetCampaignsStatisticsAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });
    },
});

export const { resetCampaigns } = campaignsSlice.actions;
export default campaignsSlice.reducer; 