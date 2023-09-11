import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import Loader from "../../Loader/Loader";

import "./account.css";

const Account = () => {
	const navigate = useNavigate();

	const { isAuthenticated, user, loading } = useSelector(
		(state) => state.userReducer
	);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
		//eslint-disable-next-line
	}, [navigate, isAuthenticated]);

	return (
		<>
			{loading && <Loader />}

			<div className="profileContainer">
				<div>
					<h1>My Profile</h1>
					<img src={user.avatar.url} alt={user.name} />
					<Button
						disabled
						size="small"
						variant="contained"
						color="info"
						sx={{ marginTop: "2.5vmax" }}
					>
						<Typography
							as={Link}
							to="/me/update"
							style={{ textDecorationLine: "line-through", color: "black" }}
						>
							❌Edit Profile❌
						</Typography>
					</Button>
				</div>
				<div>
					<div>
						<h4>Full Name</h4>
						<p>{user.name}</p>
					</div>
					<div>
						<h4>Email</h4>
						<p>{user.email}</p>
					</div>
					<div>
						<h4>Joined On</h4>
						<p>{String(user.createdAt).substring(0, 10)}</p>
					</div>

					<div>
						<Link to="/orders">My Orders</Link>
						<Link to="/me/password/update">Change Password</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;
