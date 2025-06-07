import {createSlice} from "@reduxjs/toolkit";


interface modalsState {
    modalFeedback: boolean;
    modalLogin: boolean;
    modalRegistration: boolean;
    modalContact: boolean;
    modalVideo: boolean;
    modalSuccess: boolean;
    isLoading: boolean;
    error: string
}

const initialState: modalsState = {
    modalFeedback: false,
    modalLogin: false,
    modalRegistration: false,
    modalContact:  false,
    modalVideo: false,
    modalSuccess: false,
    isLoading: false,
    error: ''
};


const modalsSlice = createSlice({
    name:'modalsSlice',
    initialState,
    reducers:{
        changeModalFeedback(state){
            state.modalFeedback = !state.modalFeedback;
        },
        changeModalLogin(state){
            state.modalLogin = !state.modalLogin;
        },
        changeModalRegistration(state){
            state.modalRegistration = !state.modalRegistration;
        },
        changeModalContact(state){
            state.modalContact = !state.modalContact;
        },
        changeModalVideo(state){
            state.modalVideo = !state.modalVideo;
        },
        changeModalSuccess(state){
            state.modalSuccess = !state.modalSuccess;
        },
    }
});

export const {changeModalFeedback,changeModalContact,changeModalLogin,changeModalRegistration,changeModalVideo,changeModalSuccess} = modalsSlice.actions;
export default modalsSlice.reducer;