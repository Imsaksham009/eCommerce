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
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchBox from "../../Search/Search.jsx";

import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const pages = [
	{ name: "Home", link: "/" },
	{ name: "Products", link: "/products" },
	{ name: "Contact", link: "/contact" },
];

function ResponsiveAppBar() {
	const { isAuthenticated, user } = useSelector((state) => state.userReducer);
	const { cartItems } = useSelector((state) => state.cartReducer);

	const settings =
		user && user.role === "admin"
			? [
					{ name: "Dashboard", link: "/admin/dashboard" },
					{ name: "Orders", link: "/orders" },
					{ name: "Account", link: "/account" },
					{ name: "Logout", link: "/logout" },
			  ]
			: [
					{ name: "Orders", link: "/orders" },
					{ name: "Account", link: "/account" },
					{ name: "Logout", link: "/logout" },
			  ];

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
		<AppBar
			position="sticky"
			elevation={0}
			sx={{
				background: "rgba(15, 23, 42, 0.86)",
				backdropFilter: "blur(10px)",
				borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{ minHeight: { xs: 70, md: 76 }, gap: 1.2 }}>
					<Typography
						component={Link}
						variant="h6"
						to="/"
						sx={{
							mr: 1.5,
							display: { xs: "none", md: "flex" },
							fontFamily: "Sora",
							fontWeight: 700,
							letterSpacing: "0.04em",
							color: "#f8fafc",
							textDecoration: "none",
						}}
					>
						eCommerce
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="navigation"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={anchorElNav}
							anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
							keepMounted
							transformOrigin={{ vertical: "top", horizontal: "left" }}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
								"& .MuiPaper-root": {
									backgroundColor: "rgba(15, 23, 42, 0.95)",
									border: "1px solid rgba(148, 163, 184, 0.26)",
									color: "#f8fafc",
								},
							}}
						>
							{pages.map((page) => (
								<MenuItem
									component={Link}
									to={page.link}
									key={page.name}
									onClick={handleCloseNavMenu}
								>
									{page.name}
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Typography
						component={Link}
						variant="h6"
						to="/"
						sx={{
							mr: "auto",
							display: { xs: "flex", md: "none" },
							fontFamily: "Sora",
							fontWeight: 700,
							letterSpacing: "0.03em",
							color: "#f8fafc",
							textDecoration: "none",
						}}
					>
						eCommerce
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							alignItems: "center",
							gap: 0.7,
						}}
					>
						{pages.map((page) => (
							<Button
								component={Link}
								to={page.link}
								key={page.name}
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: "#f8fafc",
									fontFamily: "Outfit",
									fontWeight: 500,
									textTransform: "none",
									borderRadius: 999,
									px: 1.6,
									"&:hover": {
										backgroundColor: "rgba(248, 250, 252, 0.16)",
									},
								}}
							>
								{page.name}
							</Button>
						))}
					</Box>

					<Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.4, sm: 1.2 } }}>
						<SearchBox />

						<IconButton component={Link} to="/cart" sx={{ color: "#f8fafc" }}>
							<Badge badgeContent={cartItems.length} color="warning" max={99}>
								<ShoppingBagOutlinedIcon fontSize="medium" />
							</Badge>
						</IconButton>

						{!isAuthenticated ? (
							<Button
								component={Link}
								to="/login"
								variant="outlined"
								sx={{
									borderColor: "rgba(248, 250, 252, 0.46)",
									color: "#f8fafc",
									textTransform: "none",
									fontFamily: "Outfit",
									fontWeight: 600,
									borderRadius: 999,
									px: { xs: 1.2, sm: 1.6 },
									"&:hover": {
										borderColor: "#f8fafc",
										backgroundColor: "rgba(248, 250, 252, 0.16)",
									},
								}}
							>
								Login
							</Button>
						) : (
							<>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											alt={user?.name || "User"}
											src={user?.avatar?.url || "./Profile.png"}
											sx={{ width: 34, height: 34 }}
										/>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px", "& .MuiPaper-root": { minWidth: 160 } }}
									anchorEl={anchorElUser}
									anchorOrigin={{ vertical: "top", horizontal: "right" }}
									keepMounted
									transformOrigin={{ vertical: "top", horizontal: "right" }}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem
											component={Link}
											to={setting.link}
											key={setting.name}
											onClick={handleCloseUserMenu}
										>
											{setting.name}
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
