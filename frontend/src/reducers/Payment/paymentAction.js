import axios from "axios";
import { paymentOrderFail, paymentOrderRequest, paymentOrderSuccess } from "./paymentReducer";

export const getPaymentOrder = async (dispatch, amount) => {
    try {
        dispatch(paymentOrderRequest());
        const { data } = await axios.post("/api/v1/payments/paymentorder", {
            amount
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(paymentOrderSuccess(data.newOrder));
    } catch (error) {
        dispatch(paymentOrderFail(error.response.data.message));
    }
};