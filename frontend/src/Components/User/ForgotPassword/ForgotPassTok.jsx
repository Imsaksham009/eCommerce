import React, { useEffect, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import "./forgotPassTok.css";
import Loader from "../../Loader/Loader";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../reducers/Auth/userAction";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { clearAllErrors } from "../../../reducers/Auth/forgotPasswordReducer";

const ForgotPassTok = () => {
	const params = useParams();
	const { token } = params;
	console.log(token);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { loading, resetPass, message, error } = useSelector(
		(state) => state.forgotPasswordReducer
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		resetPassword(dispatch, token, newPassword, confirmPassword);
	};

	useEffect(() => {
		if (resetPass) {
			toast.success(message);
			dispatch(clearAllErrors());
			setTimeout(() => {
				navigate("/login");
			}, 3000);
		}
		//eslint-disable-next-line
	}, [dispatch, resetPass, message]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearAllErrors());
		}
	}, [dispatch, error]);

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>

			<div className="updatePasswordContainer">
				{loading ? (
					<Loader />
				) : (
					<>
						<div className="updatePasswordBox">
							<h2 className="updatePasswordHeading">Update Profile</h2>

							<form className="updatePasswordForm" onSubmit={handleSubmit}>
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
					</>
				)}
			</div>
		</>
	);
};

export default ForgotPassTok;
