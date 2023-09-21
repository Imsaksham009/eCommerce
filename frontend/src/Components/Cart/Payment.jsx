import React, { useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Button } from "@mui/material";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../reducers/NewOrder/orderAction";
import { clearErrors as clearOrderErrors } from "../../reducers/NewOrder/orderReducer";
import { clearErrors as clearPOrdererrors } from "../../reducers/Payment/paymentReducer";
import { clearCart } from "../../reducers/Cart/cartReducer";
import axios from "axios";

const Payment = () => {
	//react-reduc hooks
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//retieve info from session
	const { grandTotal, subTotal, shippingCharges, tax } = sessionStorage.getItem(
		"orderPriceInfo"
	)
		? JSON.parse(sessionStorage.getItem("orderPriceInfo"))
		: 0;

	//get value from redux state
	const { error, loading } = useSelector((state) => state.orderReducer);
	const { cartItems, shippingInfo } = useSelector((state) => state.cartReducer);
	const { user } = useSelector((state) => state.userReducer);
	const { p_order } = useSelector((state) => state.paymentReducer);

	let order = {
		shippingInfo,
		orderItems: cartItems,
		user: user._id,
		itemsPrice: subTotal,
		taxPrice: tax,
		shippingPrice: shippingCharges,
		totalPrice: grandTotal,
	};

	const handleOrder = async (response) => {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			response;
		const pid = razorpay_payment_id;
		const sign = razorpay_signature;

		try {
			await axios.post(
				"/api/v1/payments/paymentdone",
				{
					oid: p_order.id,
					pid,
					sign,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			order.paymentInfo = {
				order_id: p_order.id,
				razorpay_order_id,
				razorpay_payment_id,
				razorpay_signature,
				status: "Success",
			};
			await createOrder(dispatch, order);
			dispatch(clearCart());
			dispatch(clearPOrdererrors());
			sessionStorage.removeItem("orderPriceInfo");
			navigate("/success");
		} catch (error) {
			toast.error("Error Occured");
			dispatch(clearPOrdererrors());
		}
	};

	const options = {
		key: "rzp_test_TInIY95ePQ8UnE",
		amount: p_order ? p_order.amount : 0,
		currency: p_order ? p_order.currency : "INR",
		name: "e-Commerce",
		description: "Order Payment",
		image:
			"https://res.cloudinary.com/doalxbr7e/image/upload/v1695291522/pngegg_fivqsa.png",
		order_id: p_order ? p_order.id : "",
		handler: handleOrder,
		prefill: {
			name: user.name,
			email: user.email,
			contact: shippingInfo.phoneNo,
		},
		notes: {
			address: "Ecommerce Corp Office, Faridabad",
		},
		theme: {
			color: "#3399cc",
		},
	};

	const handlePayButton = async (e) => {
		//Add RazorPay Payment
		e.preventDefault();
		if (p_order) {
			const rzp = new window.Razorpay(options);
			rzp.open();
		} else {
			navigate("/cart");
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearOrderErrors());
		}
	}, [dispatch, error]);
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>

			<CheckoutSteps activeStep={2} />
			<div className="updatePasswordContainer">
				<div className="updatePasswordBox">
					{loading ? (
						<Loader />
					) : (
						<form className="updatePasswordForm" onSubmit={handlePayButton}>
							<Button
								sx={{ width: "20vmax", margin: "auto" }}
								disabled={p_order ? false : true}
								type="submit"
								color="error"
								variant="contained"
							>
								Pay ₹{grandTotal} (via RazorPay)
							</Button>
						</form>
					)}
				</div>
			</div>
		</>
	);
};

export default Payment;
