/*eslint-disable no-unused-vars*/
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Face5Icon from "@mui/icons-material/Face5";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { login, register } from "../../reducers/Auth/userAction";
import { clearAllErrors } from "../../reducers/Auth/userReducer";
import "./login.css";

import Loader from "../Loader/Loader";

const LoginSignUp = () => {
	//React-redux hooks
	const dispatch = useDispatch();
	const { loading, error, isAuthenticated } = useSelector(
		(state) => state.userReducer
	);

	//react router dom
	const location = useLocation();
	const navigate = useNavigate();
	let redirect = "/account";
	if (location.state && location.state.from) {
		redirect = location.state.from;
	} else redirect = "/account";

	//Refs
	const loginTab = useRef(null);
	const registerTab = useRef(null);
	const switcherTab = useRef(null);

	//constants And State Vals
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		avatar: "",
	});
	const { name, email, password, avatar } = user;

	//Register Data Change Handler
	const registerDataChange = (e) => {
		if (e.target.name === "avatar") {
			let file = e.target.files[0];
			const result = new FileReader();

			result.onload = () => {
				if (result.readyState === 2) {
					setAvatarPreview(result.result);
				}
			};
			if (file) result.readAsDataURL(file);
			setUser({ ...user, avatar: file });
		} else setUser({ ...user, [e.target.name]: e.target.value });
	};

	//Login Form Submit Handler
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		login(dispatch, loginEmail, loginPassword);
	};

	//Register Form Submit Handler
	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append("name", name);
		myForm.append("email", email);
		myForm.append("password", password);
		myForm.append("avatar", avatar, avatar.name);

		register(dispatch, myForm);
	};

	const switchTabs = (e, tab) => {
		if (tab === "login") {
			switcherTab.current.classList.add("shiftToNeutral");
			switcherTab.current.classList.remove("shiftToRight");

			registerTab.current.classList.remove("shiftToNeutralForm");
			loginTab.current.classList.remove("shiftToLeft");
		}
		if (tab === "register") {
			switcherTab.current.classList.add("shiftToRight");
			switcherTab.current.classList.remove("shiftToNeutral");

			registerTab.current.classList.add("shiftToNeutralForm");
			loginTab.current.classList.add("shiftToLeft");
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearAllErrors());
		}
		if (isAuthenticated) {
			navigate(redirect);
		}
		//eslint-disable-next-line
	}, [dispatch, error, isAuthenticated, redirect]);

	const insertCredentials = () => {
		setLoginEmail("admin@sakshamecommerce.com");
		setLoginPassword("admin@123");
	};
	return (
		<>
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
			<div className="LoginSignUpContainer">
				{loading ? (
					<Loader />
				) : (
					<div className="LoginSignUpBox">
						<div>
							<div className="login_signUp_toggle">
								<p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
								<p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
							</div>
							<Button ref={switcherTab}></Button>
						</div>
						<form
							className="loginForm"
							ref={loginTab}
							onSubmit={handleLoginSubmit}
						>
							<Button
								variant="contained"
								color="info"
								sx={{ width: "21vmax" }}
								onClick={insertCredentials}
							>
								Insert admin Credentials
							</Button>
							<div className="loginEmail">
								<MailOutlineIcon />
								<input
									type="email"
									placeholder="Email"
									required
									value={loginEmail}
									onChange={(e) => setLoginEmail(e.target.value)}
								/>
							</div>
							<div className="loginPassword">
								<LockOpenIcon />
								<input
									type="password"
									placeholder="Password"
									minLength={8}
									required
									value={loginPassword}
									onChange={(e) => setLoginPassword(e.target.value)}
								/>
							</div>
							<Link to="/password/forgot">Forget Password ?</Link>
							<Button
								type="submit"
								variant="contained"
								color="success"
								sx={{ width: "21vmax" }}
							>
								Login
							</Button>
						</form>
						<form
							className="signUpForm"
							ref={registerTab}
							encType="multipart/form-data"
							onSubmit={handleRegisterSubmit}
						>
							<div className="signUpName">
								<Face5Icon />
								<input
									type="text"
									placeholder="Name"
									required
									name="name"
									value={name}
									onChange={registerDataChange}
								/>
							</div>
							<div className="signUpEmail">
								<MailOutlineIcon />
								<input
									type="email"
									placeholder="Email"
									required
									name="email"
									value={email}
									onChange={registerDataChange}
								/>
							</div>
							<div className="signUpPassword">
								<LockOpenIcon />
								<input
									type="password"
									placeholder="Password"
									minLength={8}
									required
									name="password"
									value={password}
									onChange={registerDataChange}
								/>
							</div>
							<div id="registerImage">
								{/* <LockOpenIcon /> */}
								<img src={avatarPreview} alt="Avatar Preview" />
								<input
									type="file"
									name="avatar"
									accept="image/*"
									onChange={registerDataChange}
									required
								/>
							</div>
							<Button
								type="submit"
								variant="contained"
								color="success"
								sx={{ width: "21vmax" }}
							>
								Register
							</Button>
						</form>
					</div>
				)}
			</div>
		</>
	);
};

export default LoginSignUp;
