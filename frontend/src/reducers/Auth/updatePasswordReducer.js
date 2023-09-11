import { createSlice } from "@reduxjs/toolkit";


const updatePasswordReducer = createSlice({
    name: "update password",
    initialState: {
        isPasswordUpdated: false
    },
    reducers: {
        updatePasswordRequest: (state) => {
            state.loading = true;
            state.isPasswordUpdated = false;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.isPasswordUpdated = action.payload;
        },
        updatePasswordFail: (state, action) => {
            state.loading = false;
            state.isPasswordUpdated = false;
            state.error = action.payload;
        },
        clearALlErrors: (state) => {
            state.isPasswordUpdated = false;
            state.error = null;
        },

    }
});

export const { updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    clearALlErrors } = updatePasswordReducer.actions;

export default updatePasswordReducer.reducer;