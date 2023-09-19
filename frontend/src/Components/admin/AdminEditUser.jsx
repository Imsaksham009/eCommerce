import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Button } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { updateUser } from "../../reducers/Admin/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors } from "../../reducers/Admin/adminReducer";
import { toast, ToastContainer } from "react-toastify";

const AdminEditUser = () => {
	const [role, setRole] = useState("");
	const dispatch = useDispatch();
	const { id } = useParams();

	const { loading, isUpdated, error } = useSelector(
		(state) => state.adminReducer
	);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		updateUser(dispatch, role, id);
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			toast.success("Role updated");
			dispatch(clearErrors());
		}
	}, [dispatch, isUpdated, error]);

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
						<form className="createProductForm" onSubmit={handleFormSubmit}>
							<h1>Update Role of {}</h1>

							<div>
								<VerifiedUserIcon />
								<select
									value={role}
									required
									onChange={(e) => setRole(e.target.value)}
								>
									<option value="">Choose Role</option>
									<option value="admin">admin</option>
									<option value="user">user</option>
								</select>
							</div>

							<Button
								color="error"
								variant="contained"
								id="createProductBtn"
								type="submit"
							>
								Update
							</Button>
						</form>
					)}
				</div>
			</div>
		</>
	);
};

export default AdminEditUser;
