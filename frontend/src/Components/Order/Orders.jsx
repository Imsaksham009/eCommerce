import React, { useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../reducers/Orders/myOrdersAction";
import { Link } from "react-router-dom";
import { clearErrors } from "../../reducers/Orders/myOrders";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import "./myOrders.css";

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

const Orders = () => {
	const { orders, error, loading } = useSelector(
		(state) => state.myOrdersReducer
	);
	const { user } = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();

	const rows = useMemo(() => {
		return (
			orders?.map((order, index) => ({
				sno: index + 1,
				id: order._id,
				orderId: order._id,
				itemsQty: order.orderItems?.length || 0,
				amount: order.totalPrice || 0,
				status: order.orderStatus || "Pending",
				createdAt: order.createdAt,
			})) || []
		);
	}, [orders]);

	const columns = useMemo(
		() => [
			{ field: "sno", headerName: "#", width: 70 },
			{
				field: "orderId",
				headerName: "Order ID",
				minWidth: 190,
				flex: 1,
				renderCell: (params) => (
					<span className="orderIdCell">#{params.value?.slice(-8)}</span>
				),
			},
			{
				field: "createdAt",
				headerName: "Placed On",
				minWidth: 140,
				flex: 0.7,
				renderCell: (params) => {
					if (!params.value) {
						return <span className="mutedCell">-</span>;
					}
					return new Date(params.value).toLocaleDateString("en-IN", {
						day: "2-digit",
						month: "short",
						year: "numeric",
					});
				},
			},
			{
				field: "status",
				headerName: "Status",
				minWidth: 150,
				flex: 0.7,
				renderCell: (params) => (
					<span className={`orderStatusPill ${getStatusClass(params.value)}`}>
						{params.value}
					</span>
				),
			},
			{
				field: "itemsQty",
				headerName: "Items",
				type: "number",
				minWidth: 110,
				flex: 0.5,
			},
			{
				field: "amount",
				headerName: "Amount",
				type: "number",
				minWidth: 140,
				flex: 0.7,
				renderCell: (params) => <span>{formatCurrency(params.value)}</span>,
			},
			{
				field: "actions",
				flex: 0.5,
				headerName: "Details",
				minWidth: 110,
				sortable: false,
				renderCell: (params) => {
					return (
						<Link className="orderActionLink" to={`/order/${params.row.id}`}>
							<OpenInNewRoundedIcon fontSize="small" />
						</Link>
					);
				},
			},
		],
		[]
	);

	const orderInsights = useMemo(() => {
		const totalOrders = orders?.length || 0;
		const deliveredOrders =
			orders?.filter((order) =>
				(order.orderStatus || "").toLowerCase().includes("deliver")
			).length || 0;
		const processingOrders = totalOrders - deliveredOrders;
		const totalSpend =
			orders?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0;

		return {
			totalOrders,
			deliveredOrders,
			processingOrders,
			totalSpend,
		};
	}, [orders]);

	useEffect(() => {
		getMyOrders(dispatch);
	}, [dispatch]);

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

			{loading ? (
				<Loader />
			) : (
				<section className="myOrdersPage">
					<div className="ordersPageHero">
						<p className="ordersPageEyebrow">Order Center</p>
						<h1>{user?.name ? `${user.name}'s Orders` : "My Orders"}</h1>
						<p>
							Track delivery progress, inspect item-level details, and keep a quick
							view of total spend.
						</p>
					</div>

					<div className="ordersInsightsGrid">
						<article className="orderInsightCard">
							<div className="orderInsightIcon iconBlue">
								<Inventory2OutlinedIcon fontSize="small" />
							</div>
							<p>Total Orders</p>
							<h3>{orderInsights.totalOrders}</h3>
						</article>
						<article className="orderInsightCard">
							<div className="orderInsightIcon iconGreen">
								<CheckCircleOutlineRoundedIcon fontSize="small" />
							</div>
							<p>Delivered</p>
							<h3>{orderInsights.deliveredOrders}</h3>
						</article>
						<article className="orderInsightCard">
							<div className="orderInsightIcon iconAmber">
								<LocalShippingOutlinedIcon fontSize="small" />
							</div>
							<p>In Progress</p>
							<h3>{orderInsights.processingOrders}</h3>
						</article>
						<article className="orderInsightCard">
							<div className="orderInsightIcon iconOrange">
								<CurrencyRupeeRoundedIcon fontSize="small" />
							</div>
							<p>Total Spend</p>
							<h3>{formatCurrency(orderInsights.totalSpend)}</h3>
						</article>
					</div>

					<div className="ordersTableShell">
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={8}
							disableSelectionOnClick
							className="myOrdersTable"
							autoHeight
							initialState={{
								sorting: {
									sortModel: [{ field: "sno", sort: "desc" }],
								},
								pagination: {
									paginationModel: { pageSize: 8, page: 0 },
								},
							}}
							pageSizeOptions={[8, 12, 20]}
						/>
					</div>
				</section>
			)}
		</>
	);
};

export default Orders;
