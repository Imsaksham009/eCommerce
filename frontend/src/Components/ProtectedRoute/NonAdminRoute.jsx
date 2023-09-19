import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

const NonAdminRoute = () => {
	return (
		<div className="PageNotFound">
			<ErrorIcon />

			<Typography>You are not an Admin. Go to Home Page. </Typography>
			<Link to="/">Home</Link>
		</div>
	);
};

export default NonAdminRoute;
