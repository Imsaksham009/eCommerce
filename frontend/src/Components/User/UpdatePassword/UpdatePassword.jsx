import React, { useEffect, useState } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import "./UpdatePassword.css";
import Loader from "../../Loader/Loader";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../reducers/Auth/userAction";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearALlErrors } from "../../../reducers/Auth/updatePasswordReducer";
const UpdatePassword = () => {
	//react-reduc hooks
	const dispatch = useDispatch();
	const { loading, error, isPasswordUpdated } = useSelector(
		(state) => state.updatePasswordReducer
	);

	const navigate = useNavigate();

	//constants state
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	//handle Submit
	const handle_UP_Submit = (e) => {
		e.preventDefault();
		updatePassword(dispatch, oldPassword, newPassword, confirmPassword);
	};

	useEffect(() => {
		if (isPasswordUpdated) {
			toast.success("Password Update Successfully");
			dispatch(clearALlErrors());
			setTimeout(() => {
				navigate("/account");
			}, 2500);
		}
	}, [isPasswordUpdated, dispatch, navigate]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearALlErrors());
		}
	}, [dispatch, error]);

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
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
				<>
					<div className="updatePasswordContainer">
						<div className="updatePasswordBox">
							<h2 className="updatePasswordHeading">Update Profile</h2>

							<form className="updatePasswordForm" onSubmit={handle_UP_Submit}>
								<div className="loginPassword">
									<VpnKeyIcon />
									<input
										type="password"
										placeholder="Old Password"
										required
										value={oldPassword}
										onChange={(e) => setOldPassword(e.target.value)}
									/>
								</div>

								<div className="loginPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="New Password"
										required
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
								</div>
								<div className="loginPassword">
									<LockIcon />
									<input
										type="password"
										placeholder="Confirm Password"
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>
								<Button
									sx={{ width: "20vmax" }}
									type="Submit"
									color="success"
									variant="contained"
								>
									Change
								</Button>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default UpdatePassword;
