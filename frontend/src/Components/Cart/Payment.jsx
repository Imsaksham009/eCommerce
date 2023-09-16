import React, { useState, useId, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Button } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyIcon from "@mui/icons-material/Key";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../reducers/NewOrder/orderAction";
import { clearErrors } from "../../reducers/NewOrder/orderReducer";
import { clearCart } from "../../reducers/Cart/cartReducer";

const Payment = () => {
	const navigate = useNavigate();
	const [paying, setPaying] = useState(false);

	const dispatch = useDispatch();

	const { grandTotal, subTotal, shippingCharges, tax } = sessionStorage.getItem(
		"orderPriceInfo"
	)
		? JSON.parse(sessionStorage.getItem("orderPriceInfo"))
		: 0;

	const { error } = useSelector((state) => state.orderReducer);
	const { cartItems, shippingInfo } = useSelector((state) => state.cartReducer);
	const { _id } = useSelector((state) => state.userReducer.user);
	const paymentInfo = {
		id: useId(),
		status: "Success",
	};

	const order = {
		shippingInfo,
		orderItems: cartItems,
		user: _id,
		paymentInfo,
		itemsPrice: subTotal,
		taxPrice: tax,
		shippingPrice: shippingCharges,
		totalPrice: grandTotal,
	};

	const handlePayButton = () => {
		//Add RazorPay Payment
		setPaying(true);
		setTimeout(() => {
			setPaying(false);
			createOrder(dispatch, order);
			dispatch(clearCart());

			navigate("/success");
		}, 3000);
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
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
				{paying ? (
					<>
						<Loader />
					</>
				) : (
					<div className="updatePasswordBox">
						<form className="updatePasswordForm" onSubmit={handlePayButton}>
							<div className="loginPassword">
								<CreditCardIcon />
								<input type="number" placeholder="XXXX XXXX XXXX XXXX" />
							</div>

							<div className="loginPassword">
								<CalendarMonthIcon />
								<input type="month" min="2023-09" />
							</div>
							<div className="loginPassword">
								<KeyIcon />
								<input type="password" max={3} placeholder="CVV" />
							</div>
							<Button
								sx={{ width: "20vmax" }}
								type="submit"
								color="error"
								variant="contained"
							>
								Pay ₹{grandTotal}
							</Button>
						</form>
					</div>
				)}
			</div>
		</>
	);
};

export default Payment;

// KEY:- rzp_test_TInIY95ePQ8UnE
//Secret Key :- PLSLt0QBEwaA3ulYzy8aeAo7
