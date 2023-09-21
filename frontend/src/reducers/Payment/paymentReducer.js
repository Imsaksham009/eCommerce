const { createSlice } = require("@reduxjs/toolkit");


const paymentSlice = createSlice({
    name: "payment order",
    initialState: {
        p_order: null
    },
    reducers: {
        paymentOrderRequest: (state, action) => {
            state.loading = true;
        },
        paymentOrderSuccess: (state, action) => {
            state.loading = false;
            state.p_order = action.payload;
        },
        paymentOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state, action) => {
            state.loading = false;
            state.p_order = null;
            state.error = null;
        },
    }
});

export const { paymentOrderRequest,
    paymentOrderSuccess,
    paymentOrderFail,
    clearErrors
} = paymentSlice.actions;

export default paymentSlice.reducer;