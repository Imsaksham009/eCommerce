import { createSlice } from "@reduxjs/toolkit";



const adminSlice = createSlice({
    name: "Admin All Users",
    initialState: {
        users: [],
        products: [],
        orders: []
    },
    reducers: {
        allUsersRequest: (state, action) => {
            state.loading = true;
        },
        allUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        allUsersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        allordersRequest: (state, action) => {
            state.loading = true;
        },
        allordersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        allordersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        allProductsRequest: (state, action) => {
            state.loading = true;
        },
        allProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        allProductsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteRequest: (state, action) => {
            state.loading = true;
        },
        deleteSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = true;
        },
        deleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state, action) => {
            state.loading = false;
            state.error = null;
            state.isDeleted = false;
        },

    }
});

export const {
    allUsersRequest,
    allUsersSuccess,
    allUsersFail,
    allordersRequest,
    allordersSuccess,
    allordersFail,
    allProductsRequest,
    allProductsSuccess,
    allProductsFail,
    clearErrors,
    deleteRequest,
    deleteSuccess,
    deleteFail
} = adminSlice.actions;

export default adminSlice.reducer;