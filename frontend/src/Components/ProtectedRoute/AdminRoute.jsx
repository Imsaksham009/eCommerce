import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NonAdminRoute from "./NonAdminRoute.jsx";

const AdminRoute = () => {
	const { user } = useSelector((state) => state.userReducer);
	return <>{user && user.role === "admin" ? <Outlet /> : <NonAdminRoute />}</>;
};

export default AdminRoute;
