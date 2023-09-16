import { createSlice } from '@reduxjs/toolkit';


const orderDetailSlice = createSlice({
    name: 'order detail',
    initialState: {
        order: {}
    },
    reducers: {
        orderRequest: (state, action) => {
            state.loading = true;
        },
        orderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        orderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state, action) => {
            state.loading = false;
            state.error = null;
        },
    }
});

export const { orderRequest, orderSuccess, orderFail, clearErrors } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;