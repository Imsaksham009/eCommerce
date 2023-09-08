import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
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
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

const pages = ["Home", "About", "Contact"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "10%",
	[theme.breakpoints.up("xs")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 1),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("xs")]: {
			width: "0.01ch",
			"&:focus": {
				width: "10ch",
			},
		},
		[theme.breakpoints.up("sm")]: {
			width: "15ch",
			"&:focus": {
				width: "25ch",
			},
		},
		[theme.breakpoints.up("md")]: {
			width: "10ch",
			"&:focus": {
				width: "35ch",
			},
		},
		[theme.breakpoints.up("lg")]: {
			width: "35ch",
			"&:focus": {
				width: "45ch",
			},
		},
		// [theme.breakpoints.up("xs")]: {
		// 	width: "0ch",
		// 	"&:focus": {
		// 		width: "0ch",
		// 	},
		// },
	},
}));

const handleSubmit = (e) => {
	e.preventDefault();
	console.log(e);
};

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [isIn, setIn] = React.useState(true);

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
					<ShoppingCartIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>

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
					<ShoppingCartIcon
						sx={{
							textDecoration: "none",
							display: { xs: "flex", md: "none" },
							position: "absolute",
							ml: "7vmax",
							mr: 1,
						}}
					/>
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
						<form onSubmit={handleSubmit}>
							<Search
								sx={{
									position: "absolute",
									right: "20vmax",
									display: "flex",
									mr: "9vmax",
									ml: "5vmax",
								}}
							>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									placeholder="Search..."
									id="search"
									inputProps={{ "aria-label": "search" }}
									onChange={(e) => console.log(e.target.value)}
								/>
							</Search>
						</form>

						{isIn ? (
							<Stack sx={{ flexGrow: 0 }} direction="row">
								<Button onClick={() => setIn(false)}>Login</Button>
								<Button onClick={() => setIn(false)}>Register</Button>
							</Stack>
						) : (
							<>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/2.jpg"
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
											<Typography textAlign="center">{setting}</Typography>
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
