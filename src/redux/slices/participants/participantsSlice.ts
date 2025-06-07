import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";

import {ICapsule, IParticipant} from "../../../helpers/types";

import {toast} from "react-toastify";
import {toastSetting} from "../../../helpers/scripts.ts";
import {
    asyncDeleteParticipantAction,
    asyncGetParticipantAction,
    asyncGetParticipantsAction, asyncGetParticipantsStatisticsAction,
    asyncUpdateParticipantAction
} from "./participantsAction.ts";



interface categoryState {
    participants: IParticipant[];
    participant: IParticipant | null;
    totalParticipants: number;
    statistics: any;
    isLoading: boolean;
    isLoadingParticipant: boolean;
    error: string
}

const initialState: categoryState = {
    participants: [],
    participant: null,
    totalParticipants:0,
    statistics: null,
    isLoading: false,
    isLoadingParticipant: false,
    error: ''
};


const participantsSlice = createSlice({
    name: 'participantsSlice',
    initialState,
    reducers: {
        resetParticipants: () => initialState,
    },
    extraReducers: (builder: ActionReducerMapBuilder<categoryState>) => {
        // Обработка asyncGetCategoriesAction
        builder
            .addCase(asyncGetParticipantsStatisticsAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncGetParticipantsStatisticsAction.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = '';
                state.statistics = action.payload;
            })
            .addCase(asyncGetParticipantsStatisticsAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });

        // Обработка asyncGetCategoriesAction
        builder
            .addCase(asyncGetParticipantsAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncGetParticipantsAction.fulfilled, (state: any, action: any) => {
                const { rows, count } = action.payload;
                state.isLoading = false;
                state.error = '';
                state.totalParticipants = count;
                state.participants = rows//action.payload?.sort((a: any, b: any) => a.order - b.order);
            })
            .addCase(asyncGetParticipantsAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });

        // Обработка asyncGetCategoryAction
        builder
            .addCase(asyncGetParticipantAction.pending, (state: any) => {
                state.isLoadingParticipant = true;
                state.error = '';
            })
            .addCase(asyncGetParticipantAction.fulfilled, (state: any, action: any) => {
                state.isLoadingParticipant = false;
                state.error = '';
                state.participant = action.payload;
            })
            .addCase(asyncGetParticipantAction.rejected, (state: any, action: any) => {
                state.isLoadingParticipant = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });

        // Обработка asyncUpdateCategoryAction
        builder
            .addCase(asyncUpdateParticipantAction.pending, (state: any) => {
                state.isLoadingParticipant = true;
                state.error = '';
            })
            .addCase(asyncUpdateParticipantAction.fulfilled, (state: any, action: any) => {
                state.isLoadingParticipant = false;
                state.error = '';
                state.participant = action.payload;
                toast.success('Участник обновлена!', toastSetting);
            })
            .addCase(asyncUpdateParticipantAction.rejected, (state: any, action: any) => {
                state.isLoadingParticipant = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);

            });


        // Обработка asyncDeleteCategoryAction
        builder
            .addCase(asyncDeleteParticipantAction.pending, (state: any) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncDeleteParticipantAction.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = '';
                state.participants = state.participants.filter((item: any) => item.id !== action.payload.id);
                toast.success('Участник удален!', toastSetting);
            })
            .addCase(asyncDeleteParticipantAction.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload, toastSetting);
            });
    },
});

export const {resetParticipants} = participantsSlice.actions;
export default participantsSlice.reducer;