import axios from "axios";
import {
    allProductsRequest,
    allUsersFail,
    allUsersSuccess,
    allUsersRequest,
    allProductsSuccess,
    allProductsFail,
    allordersRequest,
    allordersSuccess,
    allordersFail
} from "./adminReducer";


export const getUsers = async (dispatch) => {
    try {
        dispatch(allUsersRequest());
        const { data } = await axios.get('/api/v1/user/admin/allusers');
        dispatch(allUsersSuccess(data));
    } catch (error) {
        dispatch(allUsersFail(error.reponse.data.message));
    }
};

export const getProducts = async (dispatch) => {
    try {
        dispatch(allProductsRequest());
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch(allProductsSuccess(data));
    } catch (error) {
        dispatch(allProductsFail(error.reponse.data.message));
    }
};

export const getOrders = async (dispatch) => {
    try {
        dispatch(allordersRequest());
        const { data } = await axios.get('/api/v1/order/admin/orders');
        dispatch(allordersSuccess(data.orders));
    } catch (error) {
        dispatch(allordersFail(error.reponse.data.message));
    }
};