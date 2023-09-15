import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Button, Typography } from "@mui/material";
import "./confirmOrder.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
	const { user } = useSelector((state) => state.userReducer);
	const { cartItems, shippingInfo } = useSelector((state) => state.cartReducer);
	const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country} - ${shippingInfo.pinCode}`;

	const navigate = useNavigate();

	let subTotal = 0;

	cartItems.forEach((item) => {
		subTotal += item.price * item.quantity;
	});

	const shippingCharges = subTotal > 500 ? 0 : 100;
	const tax = subTotal * 0.28;

	const grandTotal = subTotal + tax + shippingCharges;

	const confirOrderHandler = () => {
		const data = {
			subTotal,
			shippingCharges,
			tax,
			grandTotal,
		};
		sessionStorage.setItem("orderPriceInfo", JSON.stringify(data));
		navigate("/payment");
	};
	return (
		<>
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

						<Button
							onClick={confirOrderHandler}
							color="error"
							variant="contained"
						>
							Proceed To Payment
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmOrder;
