// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Loader from "../Loader/Loader";

const ProtectedRoute = () => {
	const { isAuthenticated, loading } = useSelector(
		(state) => state.userReducer
	);
	const location = useLocation();
	return (
		<>
			{loading ? (
				<Loader />
			) : isAuthenticated ? (
				<Outlet />
			) : (
				<Navigate to="/login" replace state={{ from: location }} />
			)}
		</>
	);
};

export default ProtectedRoute;
