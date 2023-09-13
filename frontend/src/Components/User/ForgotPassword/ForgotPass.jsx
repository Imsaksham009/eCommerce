import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Loader from "../../Loader/Loader";

import "./forgotpassword.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../reducers/Auth/userAction";
import { clearAllErrors } from "../../../reducers/Auth/forgotPasswordReducer";

const ForgotPass = () => {
	//state
	const [email, setEmail] = useState("");

	//redux hooks
	const dispatch = useDispatch();
	const { loading, isEmailSent, error, message } = useSelector(
		(state) => state.forgotPasswordReducer
	);

	//submitHandler
	const handleSubmit = (e) => {
		e.preventDefault();
		forgotPassword(dispatch, email);
	};

	useEffect(() => {
		console.log("first");
		if (isEmailSent) {
			toast.success(message);
			dispatch(clearAllErrors());
		}
	}, [isEmailSent, dispatch, message]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearAllErrors());
		}
	}, [error, dispatch]);

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
			<div className="forgotPasswordContainer">
				{loading ? (
					<Loader />
				) : (
					<>
						<div className="forgotPasswordBox">
							<h2 className="forgotPasswordHeading">Forgot Password</h2>

							<form className="forgotPasswordForm" onSubmit={handleSubmit}>
								<div className="forgotPasswordEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<input
									type="submit"
									value="Send"
									className="forgotPasswordBtn"
								/>
							</form>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default ForgotPass;
