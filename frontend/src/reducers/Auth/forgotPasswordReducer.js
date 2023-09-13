import { createSlice } from "@reduxjs/toolkit";


const forgotPasswordReducer = createSlice({
    name: "forgot password",
    initialState: {
        isEmailSent: false,
        resetPass: false
    },
    reducers: {
        forgotPasswordRequest: (state, action) => {
            state.loading = true;
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false;
            state.isEmailSent = action.payload.success;
            state.message = action.payload.message;
        },
        forgotPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordRequest: (state, action) => {
            state.loading = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.resetPass = action.payload.success;
            state.message = action.payload.message;
        },
        resetPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null;
            state.resetPass = false;
        }
    }
});

export const {
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    clearAllErrors } = forgotPasswordReducer.actions;

export default forgotPasswordReducer.reducer;