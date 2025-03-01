import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { deleteUser, getUsers } from "../../reducers/Admin/adminAction";
import { clearErrors } from "../../reducers/Admin/adminReducer";
import Loader from "../Loader/Loader";

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
				console.log(params);
				return (
					<>
						{params.row.email === "guptasaksham82@gmail.com" ? (
							<>
								<p>I am Invinsible!</p>
								<Tooltip
									arrow={true}
									placement="bottom-end"
									title={
										<p style={{ fontSize: "1.1rem" }}>
											Hello from the developer! You can't delete me as I am IRON
											MAN 😎
										</p>
									}
								>
									<img src="/ironMan.png" height={"40px"} alt="ironman"></img>
								</Tooltip>
							</>
						) : (
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
						)}
					</>
				);
			},
		},
	];

	const rows = useMemo(() => {
		if (!users) return [];

		return users.map((user) => ({
			id: user._id,
			email: user.email,
			name: user.name,
			role: user.role,
		}));
	}, [users]);

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
