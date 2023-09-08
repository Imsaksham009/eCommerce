import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../reducers/Products/productReducer";

export const store = configureStore({
	reducer: {
		productsReducer,
	},
});
