import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
	const { user } = useSelector((state) => state.userReducer);
	return (
		<>
			{user && user.role === "admin" ? (
				<Outlet />
			) : (
				<h1>You are not allowed to access admin Routes</h1>
			)}
		</>
	);
};

export default AdminRoute;
