import axios from "axios";
import { productDetailFail, productDetailRequest, productDetailSuccess, clearErrors } from "./productDetailReducer";




export const getProductDetails = async (dispatch, id) => {
    try {
        dispatch(productDetailRequest());
        const { data } = await axios.get(`/api/v1/product/details/${id}`);
        dispatch(productDetailSuccess(data.product));
    } catch (error) {
        console.log(error);
        dispatch(productDetailFail(error.response.data.message));
    }
};

export const clearAllErrors = (dispatch) => {
    dispatch(clearErrors());
};