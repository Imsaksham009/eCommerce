import axios from "axios";
import { ordersFail, ordersRequest, ordersSuccess } from "./myOrders";


export const getMyOrders = async (dispatch) => {
    try {
        dispatch(ordersRequest());
        const { data } = await axios.get("/api/v1/order/myorders");
        dispatch(ordersSuccess(data.order));
    } catch (error) {
        dispatch(ordersFail(error.response.data.message));
    }
};