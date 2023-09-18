import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../reducers/Admin/adminAction";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import { clearErrors } from "../../reducers/Admin/adminReducer";
import "./products.css";

const AdminOrders = () => {
	const dispatch = useDispatch();
	const { orders, loading, error, isDeleted } = useSelector(
		(state) => state.adminReducer
	);

	const handleDeleteOrder = (id) => {
		deleteOrder(dispatch, id);
	};
	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

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
			flex: 0.4,
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
			minWidth: 200,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<Link to={`/order/${params.id}`}>
							<CallMadeIcon sx={{ marginRight: "1vmax" }} />
						</Link>
						<Link to={`/admin/order/${params.id}`}>
							<EditIcon />
						</Link>
						{/* onClick={() => deleteOrderHandler(params.id)} */}
						<Button onClick={() => handleDeleteOrder(params.id)}>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];
	const rows = [];

	orders &&
		orders.forEach((item) => {
			rows.push({
				id: item._id,
				itemsQty: item.orderItems.length,
				amount: item.totalPrice,
				status: item.orderStatus,
			});
		});

	useEffect(() => {
		getOrders(dispatch);
	}, [dispatch, isDeleted]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (isDeleted) {
			toast.success("Order Deleted");
			dispatch(clearErrors());
		}
	}, [dispatch, error, isDeleted]);

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
				{loading ? (
					<Loader />
				) : (
					<div className="productListContainer">
						<h1 id="productListHeading">ALL ORDERS</h1>

						<DataGrid
							rows={rows}
							columns={columns}
							disableSelectionOnClick
							className="productListTable"
							autoHeight
							initialState={{
								pagination: { paginationModel: { pageSize: 10 } },
							}}
							pageSizeOptions={[10, 25, 50, 100]}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default AdminOrders;
