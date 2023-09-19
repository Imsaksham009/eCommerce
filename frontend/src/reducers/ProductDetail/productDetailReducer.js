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
            state.product = {};
        },
        newReviewRequest: (state, action) => {
            state.loading = true;
        },
        newReviewSuccess: (state, action) => {
            state.loading = false;
            state.review = action.payload;
        },
        newReviewFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteReviewRequest: (state,) => {
            state.loading = true;
        },
        deleteReviewSuccess: (state,) => {
            state.loading = false;
            state.isReviewDeleted = true;
        },
        deleteReviewError: (state, action) => {
            state.loading = false;
            state.isReviewDeleted = false;
            state.error = action.payload;

        },
        clearErrors: (state,) => {
            state.error = null;
            state.review = null;
            state.isReviewDeleted = false;
        }
    }
});


export const { deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewError,
    productDetailSuccess,
    productDetailRequest,
    productDetailFail,
    clearErrors,
    newReviewRequest,
    newReviewSuccess,
    newReviewFail } = productSlice.actions;

export default productSlice.reducer;