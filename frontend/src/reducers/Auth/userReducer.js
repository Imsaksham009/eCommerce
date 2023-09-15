import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null
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
            state.user = null;

        },
        registerRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = null;
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
            state.user = null;
        },
        logoutRequest: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        loadUserRequest: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
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
    logouFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail
} = userSlice.actions;

export default userSlice.reducer;