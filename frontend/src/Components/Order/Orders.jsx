import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../reducers/Orders/myOrdersAction";
import { Link } from "react-router-dom";
import { clearErrors } from "../../reducers/Orders/myOrders";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import "./myOrders.css";
import { Typography } from "@mui/material";
const columns = [
	{ field: "sno", headerName: "S. NO.", width: 70 },
	{ field: "id", headerName: "ID", width: 70 },
	{
		field: "status",
		headerName: "Status",
		minWidth: 150,
		flex: 0.5,
		cellClassName: (params) => {
			return params.value === "Delivered" ? "greenColor" : "redColor";
		},
	},
	{
		field: "itemsQty",
		headerName: "Items Qty",
		type: "number",
		minWidth: 150,
		flex: 0.3,
	},

	{
		field: "amount",
		headerName: "Amount",
		type: "number",
		minWidth: 270,
		flex: 0.5,
	},

	{
		field: "actions",
		flex: 0.3,
		headerName: "Actions",
		minWidth: 150,
		type: "number",
		sortable: false,
		renderCell: (params) => {
			return (
				<Link to={`/order/${params.id}`}>
					<LaunchIcon />
				</Link>
			);
		},
	},
];

const Orders = () => {
	const { orders, error, loading } = useSelector(
		(state) => state.myOrdersReducer
	);
	const { user } = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();

	const rows = [];

	orders &&
		orders.forEach((order, i) => {
			rows.push({
				sno: i,
				id: order._id,
				itemsQty: order.orderItems.length,
				amount: order.totalPrice,
				status: order.orderStatus,
			});
		});

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
				<div className="myOrdersPage">
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="myOrdersTable"
						autoHeight
						initialState={{
							sorting: {
								sortModel: [{ field: "sno", sort: "desc" }],
							},
						}}
					/>

					<Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
				</div>
			)}
		</>
	);
};

export default Orders;
