import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import "./products.css";
import Loader from "../Loader/Loader";
import { deleteProduct, getProducts } from "../../reducers/Admin/adminAction";
import { clearErrors } from "../../reducers/Admin/adminReducer";

const AllProducts = () => {
	const { products, loading, error, isDeleted } = useSelector(
		(state) => state.adminReducer
	);

	const handleDeleteProduct = (id) => {
		deleteProduct(dispatch, id);
	};

	const columns = [
		{ field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

		{
			field: "name",
			headerName: "Name",
			minWidth: 350,
			flex: 1,
		},
		{
			field: "stock",
			headerName: "Stock",
			type: "number",
			minWidth: 150,
			flex: 0.3,
		},

		{
			field: "price",
			headerName: "Price",
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
					<>
						<Link to={`/admin/product/${params.id}`}>
							<EditIcon />
						</Link>
						{/* onClick={() => deleteProductHandler(params.id)} */}
						<Button onClick={() => handleDeleteProduct(params.id)}>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];
	const rows = [];

	products &&
		products.forEach((item) => {
			rows.push({
				id: item._id,
				name: item.name,
				stock: item.stock,
				price: item.price,
			});
		});

	const dispatch = useDispatch();

	useEffect(() => {
		getProducts(dispatch);
	}, [dispatch, isDeleted]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (isDeleted) {
			toast.success("Product Deleted");
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
						<h1 id="productListHeading">ALL PRODUCTS</h1>
						<DataGrid
							rows={rows}
							columns={columns}
							disableSelectionOnClick
							className="productListTable"
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

export default AllProducts;
