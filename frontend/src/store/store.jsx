import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../reducers/Products/productReducer";
import productDetailReducer from "../reducers/ProductDetail/productDetailReducer";
import userReducer from "../reducers/Auth/userReducer";
import updatePasswordReducer from "../reducers/Auth/updatePasswordReducer";
import forgotPasswordReducer from "../reducers/Auth/forgotPasswordReducer";

export const store = configureStore({
	reducer: {
		productsReducer,
		productDetailReducer,
		userReducer,
		updatePasswordReducer,
		forgotPasswordReducer,
	},
});
