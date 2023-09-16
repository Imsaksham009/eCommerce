import { createSlice } from "@reduxjs/toolkit";

const myOrdersSlice = createSlice({
    name: "my orders",
    initialState: {
        orders: []
    },
    reducers: {
        ordersRequest: (state, action) => {
            state.loading = true;
        },
        ordersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        ordersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state, action) => {
            state.loading = false;
            state.error = null;
        }
    }
});

export const { ordersRequest, ordersSuccess, ordersFail, clearErrors } = myOrdersSlice.actions;

export default myOrdersSlice.reducer;