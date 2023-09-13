/* eslint-disable  no-unused-vars */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"; // import SearchIcon from "@mui/icons-material/Search";
import SearchBox from "../../Search/Search.jsx";

import { Link } from "react-router-dom";
import { Badge, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const pages = ["Home", "Products", "Contact"];
let settings = ["Orders", "Account", "Logout"];

function ResponsiveAppBar() {
	//React-Redux Hooks
	const dispatch = useDispatch();
	const { isAuthenticated, user } = useSelector((state) => state.userReducer);
	const { cartItems } = useSelector((state) => state.cartReducer);
	if (user && user.role === "admin") {
		// settings.push("Dashboard");
		settings = ["Dashboard", "Orders", "Account", "Logout"];
	}

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						as={Link}
						variant="h6"
						noWrap
						to="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "Roboto",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						eCommerce
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
								mr: "2vmax",
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography
										as={Link}
										sx={{ textDecoration: "none", color: "white" }}
										to={`${page}`}
									>
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Typography
									as={Link}
									style={{ textDecoration: "none", color: "white" }}
									to={`${page}`}
								>
									{page}
								</Typography>
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<SearchBox />

						<Typography
							as={Link}
							to="/cart"
							sx={{ color: "white", textDecoration: "none" }}
						>
							<Badge
								badgeContent={cartItems.length}
								color="error"
								sx={{
									position: "absolute",
									marginLeft: "-3.5vmax",
									top: "1.2vmax",
								}}
							>
								<ShoppingBagOutlinedIcon fontSize="large" />
							</Badge>
						</Typography>

						{!isAuthenticated ? (
							<Stack
								sx={{ flexGrow: 0, marginLeft: "1.7vmax" }}
								direction="row"
							>
								<Button
									variant="outlined"
									color="error"
									sx={{ marginLeft: "2vmax" }}
								>
									<Typography
										as={Link}
										to="/login"
										style={{ textDecoration: "none", color: "white" }}
									>
										Login
									</Typography>
								</Button>
								{/* <Button onClick={() => setIn(false)}>Register</Button> */}
							</Stack>
						) : (
							<>
								<Tooltip title="Open settings">
									<IconButton
										onClick={handleOpenUserMenu}
										sx={{ p: 0, marginLeft: "1.7vmax" }}
									>
										<Avatar
											alt="Remy Sharp"
											src={user.avatar.url ? user.avatar.url : "./Profile.png"}
										/>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem key={setting} onClick={handleCloseUserMenu}>
											<Typography
												as={Link}
												to={`/${setting}`}
												style={{ textDecoration: "none", color: "white" }}
												textAlign="center"
											>
												{setting}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
