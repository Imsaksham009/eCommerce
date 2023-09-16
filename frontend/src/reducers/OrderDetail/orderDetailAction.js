import axios from "axios";
import { orderFail, orderRequest, orderSuccess } from "./orderDetailReducer";

export const getOrderDetail = async (dispatch, id) => {
    try {
        dispatch(orderRequest());
        const { data } = await axios.get(`/api/v1/order/orderdetail/${id}`);
        dispatch(orderSuccess(data.order));
    } catch (error) {
        ;
        dispatch(orderFail(error.response.data.message));
    }
};