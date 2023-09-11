import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { isAuthenticated, loading } = useSelector(
		(state) => state.userReducer
	);

	useEffect(() => {
		if (!isAuthenticated) {
			return navigate("/login");
		}
		return () => {};
	}, [isAuthenticated, navigate]);

	return <>{loading ? <Loader /> : isAuthenticated && children}</>;
};

export default ProtectedRoute;
