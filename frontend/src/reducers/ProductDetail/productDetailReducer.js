import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    product: {}
};

export const productSlice = createSlice({
    name: 'product detail',
    initialState,
    reducers: {
        productDetailRequest: (state) => {
            state.loading = true;
            state.product = { ...state.product };
            state.error = null;
        },
        productDetailSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = null;
        },
        productDetailFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearErrors: (state, action) => {
            state.error = null;
        }
    }
});


export const { productDetailSuccess, productDetailRequest, productDetailFail, clearErrors } = productSlice.actions;

export default productSlice.reducer;