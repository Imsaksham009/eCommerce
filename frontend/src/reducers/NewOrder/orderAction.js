import axios from "axios";
import { orderFail, orderRequest, orderSuccess } from "./orderReducer";

export const createOrder = async (dispatch, order) => {
    try {
        dispatch(orderRequest());
        const { data } = await axios.post("/api/v1/order/new", order, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        // console.log(data);
        dispatch(orderSuccess(data));
    } catch (error) {
        dispatch(orderFail(error.response.data.message));
    }
};