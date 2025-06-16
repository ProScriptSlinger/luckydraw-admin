import {combineReducers,configureStore} from "@reduxjs/toolkit";
import modalsSlice from "./slices/modalsSlice";
import authSlice from "./slices/auth/authSlice";
import usersSlice from "./slices/users/usersSlice";
import participantsSlice from "./slices/participants/participantsSlice.ts";
import campaignsSlice from "./slices/campaigns/campaignsSlice.ts";
import purchasesSlice from "./slices/purchases/purchasesSlice.ts";
import tasksSlice from "./slices/tasks/tasksSlice.ts";

const rootReducer = combineReducers({
    auth: authSlice,
    users: usersSlice,
    participants: participantsSlice,
    campaigns: campaignsSlice,
    purchases: purchasesSlice,
    tasks: tasksSlice,
    modals: modalsSlice,
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch