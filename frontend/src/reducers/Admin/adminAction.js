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
    allordersFail,
    deleteFail,
    deleteRequest,
    deleteSuccess,
    newProductFail,
    newProductRequest,
    newProductSuccess,
    updateRequest,
    updateSuccess,
    updateFail,
} from "./adminReducer";


export const getUsers = async (dispatch) => {
    try {
        dispatch(allUsersRequest());
        const { data } = await axios.get('/api/v1/user/admin/allusers');
        dispatch(allUsersSuccess(data));
    } catch (error) {
        dispatch(allUsersFail(error.response.data.message));
    }
};

export const getProducts = async (dispatch) => {
    try {
        dispatch(allProductsRequest());
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch(allProductsSuccess(data));
    } catch (error) {
        dispatch(allProductsFail(error.response.data.message));
    }
};

export const getOrders = async (dispatch) => {
    try {
        dispatch(allordersRequest());
        const { data } = await axios.get('/api/v1/order/admin/orders');
        dispatch(allordersSuccess(data.orders));
    } catch (error) {
        dispatch(allordersFail(error.response.data.message));
    }
};

export const deleteProduct = async (dispatch, id) => {
    try {
        dispatch(deleteRequest());
        await axios.delete(`/api/v1/admin/product/delete/${id}`);
        dispatch(deleteSuccess());
    } catch (error) {
        dispatch(deleteFail(error.response.data.message));
    }
};

export const deleteOrder = async (dispatch, id) => {
    try {
        dispatch(deleteRequest());
        await axios.delete(`/api/v1/order/admin/deleteorder/${id}`);
        dispatch(deleteSuccess());
    } catch (error) {
        dispatch(deleteFail(error.response.data.message));
    }
};

export const deleteUser = async (dispatch, id) => {
    try {
        dispatch(deleteRequest());
        await axios.delete(`/api/v1/user/admin/delete/${id}`);
        dispatch(deleteSuccess());
    } catch (error) {
        dispatch(deleteFail(error.response.data.message));
    }
};

export const createNewProduct = async (dispatch, myForm) => {
    try {
        dispatch(newProductRequest());
        await axios.post("/api/v1/admin/product/new", myForm, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch(newProductSuccess());


    } catch (error) {
        dispatch(newProductFail(error.response.data.message));

    }
};

export const updateProduct = async (dispatch, myForm, id) => {
    try {
        dispatch(updateRequest());
        await axios.put(`/api/v1/admin/product/edit/${id}`, myForm, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch(updateSuccess());


    } catch (error) {
        dispatch(updateFail(error.response.data.message));

    }
};

export const updateOrder = async (dispatch, status, id) => {
    try {
        dispatch(updateRequest());
        await axios.put(`/api/v1/order/admin/updateorder/${id}`, { status }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(updateSuccess());


    } catch (error) {
        dispatch(updateFail(error.response.data.message));

    }
};

export const updateUser = async (dispatch, role, id) => {
    try {
        dispatch(updateRequest());
        await axios.put(`/api/v1/user/admin/changerole/${id}`, { role }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(updateSuccess());


    } catch (error) {
        dispatch(updateFail(error.response.data.message));

    }
}


