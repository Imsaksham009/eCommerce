import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { getOrderDetail } from "../../reducers/OrderDetail/orderDetailAction";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { clearErrors as clearOrderError } from "../../reducers/OrderDetail/orderDetailReducer";
import { clearErrors as clearUpdateError } from "../../reducers/Admin/adminReducer";
import { toast, ToastContainer } from "react-toastify";
import { updateOrder } from "../../reducers/Admin/adminAction";
import "./style.css";
const AdminProcessOrder = () => {
	const { id } = useParams();

	const { order, loading, error } = useSelector(
		(state) => state.orderDetailReducer
	);
	const {
		isUpdated,
		error: updateError,
		loading: updateLoading,
	} = useSelector((state) => state.adminReducer);
	const dispatch = useDispatch();

	const [status, setStatus] = useState("");

	const handleFormSubmit = (e) => {
		e.preventDefault();
		updateOrder(dispatch, status, id);
	};

	useEffect(() => {
		getOrderDetail(dispatch, id);
	}, [dispatch, id, isUpdated]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearOrderError());
		}
		if (updateError) {
			toast.error(updateError);
			dispatch(clearUpdateError());
		}
		if (isUpdated) {
			toast.success("Order Processed");
			dispatch(clearUpdateError());
		}
	}, [dispatch, error, updateError, isUpdated]);
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
			<div className="dashboard">
				<div className="newProductContainer">
					{loading ? (
						<Loader />
					) : (
						<div
							className="confirmOrderPage"
							style={{
								display: order.orderStatus === "Delivered" ? "block" : "grid",
							}}
						>
							<div>
								<div className="confirmshippingArea">
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
												{order.paymentInfo &&
												order.paymentInfo.status === "Success"
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
								<div className="confirmCartItems">
									<Typography>Your Cart Items:</Typography>
									<div className="confirmCartItemsContainer">
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
							</div>
							{/*  */}
							<div
								style={{
									display: order.orderStatus === "Delivered" ? "none" : "block",
								}}
							>
								<form className="updateOrderForm" onSubmit={handleFormSubmit}>
									<h1>Process Order</h1>

									<div>
										<AccountTreeIcon />
										<select
											onChange={(e) => {
												setStatus(e.target.value);
											}}
										>
											<option value="">Choose Category</option>
											{order.orderStatus === "Processing" && (
												<>
													<option value="Shipped">Shipped</option>
												</>
											)}

											{order.orderStatus === "Shipped" && (
												<option value="Delivered">Delivered</option>
											)}
										</select>
									</div>

									<Button
										disabled={updateLoading}
										color="info"
										variant="contained"
										id="createProductBtn"
										type="submit"
									>
										Process
									</Button>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default AdminProcessOrder;
