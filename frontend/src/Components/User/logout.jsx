import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllErrors } from "../../reducers/Auth/userReducer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Loader from "../Loader/Loader";
import { logout } from "../../reducers/Auth/userAction";

const Logout = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, loading, error } = useSelector(
		(state) => state.userReducer
	);

	const navigate = useNavigate();

	useEffect(() => {
		logout(dispatch);
		toast.success("Log Out Successfully");
		if (!isAuthenticated) {
			navigate("/login");
			return;
		}

		return () => {};
	}, [dispatch, isAuthenticated, navigate]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearAllErrors());
		}
	}, [dispatch, error]);
	return (
		<div style={{ height: "30vh" }}>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{loading ? <Loader /> : <h1>Logout</h1>}
		</div>
	);
};

export default Logout;
