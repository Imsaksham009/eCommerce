import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../reducers/OrderDetail/orderDetailAction";

import { toast, ToastContainer } from "react-toastify";
import { clearErrors } from "../../reducers/OrderDetail/orderDetailReducer";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import "./orderdetail.css";
const OrderDetail = () => {
	const { id } = useParams();

	const { loading, error, order } = useSelector(
		(state) => state.orderDetailReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		getOrderDetail(dispatch, id);
	}, [dispatch, id]);

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
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className="orderDetailsPage">
				{loading ? (
					<Loader />
				) : (
					<>
						<div className="orderDetailsContainer">
							<Typography component="h3">
								Order #{order && order._id}
							</Typography>
							<Typography>Shipping Info</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p>Name:</p>
									<span>{order.user && order.user.name}</span>
								</div>
								<div>
									<p>Phone:</p>
									<span>
										{order.shippingInfo && order.shippingInfo.phoneNo}
									</span>
								</div>
								<div>
									<p>Address:</p>
									<span>
										{order.shippingInfo &&
											`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
									</span>
								</div>
							</div>
							<Typography>Payment</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p
										className={
											order.paymentInfo &&
											order.paymentInfo.status === "Success"
												? "greenColor"
												: "redColor"
										}
									>
										{order.paymentInfo && order.paymentInfo.status === "Success"
											? "PAID"
											: "NOT PAID"}
									</p>
								</div>

								<div>
									<p>Amount:</p>
									<span>{order.totalPrice && order.totalPrice}</span>
								</div>
							</div>

							<Typography>Order Status</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p
										className={
											order.orderStatus && order.orderStatus === "Delivered"
												? "greenColor"
												: "redColor"
										}
									>
										{order.orderStatus && order.orderStatus}
									</p>
								</div>
							</div>
						</div>

						<div className="orderDetailsCartItems">
							<Typography>Order Items:</Typography>
							<div className="orderDetailsCartItemsContainer">
								{order.orderItems &&
									order.orderItems.map((item) => (
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
									))}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default OrderDetail;
