import React from "react";
import { Outlet } from "react-router-dom";
import "./header.css";
import ResponsiveAppBar from "./navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "../Footer/footer";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const Header = () => {
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
