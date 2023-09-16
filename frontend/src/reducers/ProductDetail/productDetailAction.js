import axios from "axios";
import { productDetailFail, productDetailRequest, productDetailSuccess, clearErrors, newReviewFail, newReviewRequest, newReviewSuccess, deleteReviewError, deleteReviewRequest, deleteReviewSuccess } from "./productDetailReducer";




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

export const createNewReview = async (dispatch, id, rating, comment) => {
    try {
        dispatch(newReviewRequest());
        const { data } = await axios.post(`/api/v1/product/${id}/review`, { rating, comment }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(newReviewSuccess(data.message));
    } catch (error) {
        dispatch(newReviewFail(error.response.data.message));
    }
};

export const deleteReview = async (dispatch, id, reviewid) => {
    try {
        dispatch(deleteReviewRequest());
        await axios.delete(`/api/v1/product/${id}/review/delete/${reviewid}`);
        dispatch(deleteReviewSuccess());
    } catch (error) {
        deleteReviewError(error.response.data.message);
    }
};

export const clearAllErrors = (dispatch) => {
    dispatch(clearErrors());
};