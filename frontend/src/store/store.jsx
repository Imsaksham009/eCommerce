import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../reducers/Products/productReducer";
import productDetailReducer from "../reducers/ProductDetail/productDetailReducer";

export const store = configureStore({
	reducer: {
		productsReducer,
		productDetailReducer,
	},
});
