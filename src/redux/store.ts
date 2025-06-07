import {combineReducers,configureStore} from "@reduxjs/toolkit";
import modalsSlice from "./slices/modalsSlice";
import authSlice from "./slices/auth/authSlice";
import usersSlice from "./slices/users/usersSlice";
import capsulesSlice from "./slices/capsules/capsulesSlice.ts";
import participantsSlice from "./slices/participants/participantsSlice.ts";

const rootReducer = combineReducers({
    auth: authSlice,
    users: usersSlice,
    participants: participantsSlice,
    capsules: capsulesSlice,
    modals: modalsSlice,

});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch