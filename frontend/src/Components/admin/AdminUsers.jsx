import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Loader from "../Loader/Loader";
import { deleteUser, getUsers } from "../../reducers/Admin/adminAction";
import { clearErrors } from "../../reducers/Admin/adminReducer";

const AdminUsers = () => {
	const { users, loading, error, isDeleted } = useSelector(
		(state) => state.adminReducer
	);
	const dispatch = useDispatch();

	const columns = [
		{ field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

		{
			field: "email",
			headerName: "Email",
			minWidth: 200,
			flex: 1,
		},
		{
			field: "name",
			headerName: "Name",
			minWidth: 150,
			flex: 0.5,
		},

		{
			field: "role",
			headerName: "Role",
			type: "number",
			minWidth: 150,
			flex: 0.3,
			cellClassName: (params) => {
				return params.value === "admin" ? "greenColor" : "redColor";
			},
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
						<Link to={`/admin/user/${params.id}`}>
							<EditIcon />
						</Link>

						<Button
							onClick={() => {
								deleteUser(dispatch, params.id);
							}}
						>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	users &&
		users.forEach((user) => {
			rows.push({
				id: user._id,
				email: user.email,
				name: user.name,
				role: user.role,
			});
		});

	useEffect(() => {
		getUsers(dispatch);
	}, [dispatch, isDeleted]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (isDeleted) {
			toast.success("User Deleted");
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
				<div className="productListContainer">
					<h1 id="productListHeading">ALL USERS</h1>
					{loading ? (
						<Loader />
					) : (
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
					)}
				</div>
			</div>
		</>
	);
};

export default AdminUsers;
