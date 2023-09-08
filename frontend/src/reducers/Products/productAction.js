import { allProductRequest, allProductSuccess, allProductFail, clearAllErrors } from "./productReducer";
import axios from "axios";


export const getProducts = async (dispatch) => {
    try {
        dispatch(allProductRequest());
        const { data } = await axios.get("api/v1/products");
        dispatch(allProductSuccess(data));
    } catch (e) {
        console.log(e);
        dispatch(allProductFail(e.response.data.message));
    }
};

export const clearErrors = async (dispatch) => {
    dispatch(clearAllErrors());

};