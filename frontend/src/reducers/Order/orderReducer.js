import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'new order',
    initialState: {
        orderData: null
    },
    reducers: {
        orderRequest: (state) => {
            state.loading = true;
        },
        orderSuccess: (state, action) => {
            state.loading = false;
            state.orderData = action.payload;
        },
        orderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.loading = false;
            state.error = null;
        },
    }
});

export const { orderFail, orderRequest, orderSuccess, clearErrors } = orderSlice.actions;

export default orderSlice.reducer;