import React, { useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Button, Typography } from "@mui/material";
import "./confirmOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPaymentOrder } from "../../reducers/Payment/paymentAction";
import { toast, ToastContainer } from "react-toastify";
import { clearErrors } from "../../reducers/Payment/paymentReducer";
import Loader from "../Loader/Loader";

const ConfirmOrder = () => {
	const { user } = useSelector((state) => state.userReducer);
	const { cartItems, shippingInfo } = useSelector((state) => state.cartReducer);
	const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country} - ${shippingInfo.pinCode}`;

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { loading, error, p_order } = useSelector(
		(state) => state.paymentReducer
	);

	let subTotal = 0;

	cartItems.forEach((item) => {
		subTotal += item.price * item.quantity;
	});

	const shippingCharges = subTotal > 500 || subTotal === 0 ? 0 : 100;
	const tax = Math.floor(subTotal * 0.28);

	const grandTotal = subTotal + tax + shippingCharges;

	const confirOrderHandler = async () => {
		const data = {
			subTotal,
			shippingCharges,
			tax,
			grandTotal,
		};
		sessionStorage.setItem("orderPriceInfo", JSON.stringify(data));
		await getPaymentOrder(dispatch, grandTotal);
	};

	useEffect(() => {
		if (p_order) {
			navigate("/payment");
		}
	}, [p_order, navigate]);

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
			<CheckoutSteps activeStep={1} />
			<div className="confirmOrderPage">
				<div>
					<div className="confirmshippingArea">
						<Typography>Shipping Info</Typography>
						<div className="confirmshippingAreaBox">
							<div>
								<p>Name:</p>
								<span>{user.name}</span>
							</div>
							<div>
								<p>Phone:</p>
								<span>{shippingInfo.phoneNo}</span>
							</div>
							<div>
								<p>Address:</p>
								<span>{address}</span>
							</div>
						</div>
					</div>
					<div className="confirmCartItems">
						<Typography>Your Cart Items:</Typography>
						<div className="confirmCartItemsContainer">
							{cartItems &&
								cartItems.map((item) => {
									return (
										<div key={item.product}>
											<img src={item.image} alt="Product" />
											<Link to={`/product/${item.product}`}>
												{item.name}
											</Link>{" "}
											<span>
												{item.quantity} X ₹{item.price} ={" "}
												<b>₹{item.price * item.quantity}</b>
											</span>
										</div>
									);
								})}
						</div>
					</div>
				</div>
				<div>
					<div className="orderSummary">
						<Typography>Order Summery</Typography>
						<div>
							<div>
								<p>Subtotal:</p>
								<span>₹{subTotal}</span>
							</div>
							<div>
								<p>Shipping Charges:</p>
								<span>₹{shippingCharges}</span>
							</div>
							<div>
								<p>GST:</p>
								<span>₹{tax}</span>
							</div>
						</div>

						<div className="orderSummaryTotal">
							<p>
								<b>Total:</b>
							</p>
							<span>₹{grandTotal}</span>
						</div>
						{loading ? (
							<Loader />
						) : (
							<Button
								disabled={grandTotal === 0}
								onClick={confirOrderHandler}
								color="error"
								variant="contained"
							>
								Proceed To Payment
							</Button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmOrder;
