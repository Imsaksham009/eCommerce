import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        allProductRequest: (state) => {
            state.loading = true;
            state.products = [];
        },
        allProductSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.totalCount = action.payload.totalCount;
        },
        allProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state, action) => {
            // state = { ...state };
            state.error = null;
        }
    }
}
);



export const { allProductRequest, allProductFail, allProductSuccess, clearAllErrors } = productsSlice.actions;

export default productsSlice.reducer;