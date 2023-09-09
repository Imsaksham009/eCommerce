import { allProductRequest, allProductSuccess, allProductFail, clearAllErrors } from "./productReducer";
import axios from "axios";


export const getProducts = async (dispatch, keyword = "", page = 1, price = [100, 250000], category) => {
    try {

        //Products Request Action
        dispatch(allProductRequest());

        let link = `/api/v1/products?q=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        if (category) {
            link = `/api/v1/products?q=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
        }
        //Fetch data from backend
        const { data } = await axios.get(link);

        //Store Products in redux store
        dispatch(allProductSuccess(data));

    } catch (e) {
        //If any error occurs, stored in redux
        dispatch(allProductFail(e.response.data.message));
    }
};

export const clearErrors = async (dispatch) => {
    dispatch(clearAllErrors());

};