import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../reducers/OrderDetail/orderDetailAction";

import { toast, ToastContainer } from "react-toastify";
import { clearErrors } from "../../reducers/OrderDetail/orderDetailReducer";
import Loader from "../Loader/Loader";
import "./orderdetail.css";

const formatCurrency = (value) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(value || 0);
};

const getStatusClass = (status = "") => {
	const normalizedStatus = status.toLowerCase();
	if (normalizedStatus.includes("deliver")) {
		return "statusDelivered";
	}
	if (normalizedStatus.includes("process") || normalizedStatus.includes("ship")) {
		return "statusProcessing";
	}
	return "statusPending";
};

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

	const isPaid = order?.paymentInfo?.status === "Success";
	const itemCount =
		order?.orderItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

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

			{loading ? (
				<Loader />
			) : (
				<div className="orderDetailsPage">
					<section className="orderDetailHero">
						<p className="orderDetailEyebrow">Order Detail</p>
						<div className="orderDetailHeroTop">
							<h1>Order #{order?._id?.slice(-10)}</h1>
							<span
								className={`orderDetailStatus ${getStatusClass(order?.orderStatus)}`}
							>
								{order?.orderStatus || "Pending"}
							</span>
						</div>
						<p>
							Placed on{" "}
							{order?.createdAt
								? new Date(order.createdAt).toLocaleDateString("en-IN", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								  })
								: "-"}
						</p>
					</section>

					<section className="orderSnapshotGrid">
						<article className="orderSnapshotCard">
							<p>Total Amount</p>
							<h3>{formatCurrency(order?.totalPrice)}</h3>
						</article>
						<article className="orderSnapshotCard">
							<p>Payment</p>
							<h3 className={isPaid ? "paidText" : "unpaidText"}>
								{isPaid ? "Paid" : "Not Paid"}
							</h3>
						</article>
						<article className="orderSnapshotCard">
							<p>Total Items</p>
							<h3>{itemCount}</h3>
						</article>
						<article className="orderSnapshotCard">
							<p>Destination</p>
							<h3>{order?.shippingInfo?.city || "-"}</h3>
						</article>
					</section>

					<div className="orderInfoLayout">
						<div className="orderInfoCard">
							<h2>Shipping Information</h2>
							<div className="orderInfoList">
								<div>
									<span>Name</span>
									<p>{order?.user?.name || "-"}</p>
								</div>
								<div>
									<span>Phone</span>
									<p>{order?.shippingInfo?.phoneNo || "-"}</p>
								</div>
								<div>
									<span>Address</span>
									<p>
										{order?.shippingInfo
											? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
											: "-"}
									</p>
								</div>
							</div>
						</div>

						<div className="orderInfoCard">
							<h2>Payment Details</h2>
							<div className="orderInfoList">
								<div>
									<span>Status</span>
									<p className={isPaid ? "paidText" : "unpaidText"}>
										{isPaid ? "Paid" : "Not Paid"}
									</p>
								</div>
								<div>
									<span>Order Total</span>
									<p>{formatCurrency(order?.totalPrice)}</p>
								</div>
								<div>
									<span>Payment ID</span>
									<p>{order?.paymentInfo?.id || "Not Available"}</p>
								</div>
							</div>
						</div>
					</div>

					<section className="orderItemsSection">
						<h2>Items in this order</h2>
						<div className="orderItemsGrid">
							{order?.orderItems && order.orderItems.length > 0 ? (
								order.orderItems.map((item) => (
									<article className="orderItemCard" key={item.product}>
										<img src={item.image} alt={item.name} />
										<div className="orderItemBody">
											<Link to={`/product/${item.product}`}>{item.name}</Link>
											<p>
												{item.quantity} x {formatCurrency(item.price)}
											</p>
										</div>
										<div className="orderItemTotal">
											{formatCurrency(item.price * item.quantity)}
										</div>
									</article>
								))
							) : (
								<div className="orderItemsEmpty">No items found for this order.</div>
							)}
						</div>
					</section>
				</div>
			)}
		</>
	);
};

export default OrderDetail;
