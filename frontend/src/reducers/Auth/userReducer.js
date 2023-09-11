import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {}
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;

        },
        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;

        },
        registerRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;

        },
        registerFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;

        },
        logoutRequest: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.user = {};
            state.isAuthenticated = false;
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state) => {
            state.error = null;
        }
    }
});

export const { loginRequest,
    loginSuccess,
    loginFail,
    registerRequest,
    registerSuccess,
    registerFail,
    clearAllErrors,
    logoutRequest,
    logoutSuccess,
    logouFail
} = userSlice.actions;

export default userSlice.reducer;