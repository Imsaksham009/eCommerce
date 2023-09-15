import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./header.css";
import ResponsiveAppBar from "./navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "../Footer/footer";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../reducers/Auth/userAction";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const Header = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		loadUser(dispatch);
	}, [dispatch]);

	return (
		<>
			<ThemeProvider theme={darkTheme}>
				<ResponsiveAppBar />
			</ThemeProvider>
			<Outlet />
			<Footer />
		</>
	);
};

export default Header;
