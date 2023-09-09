import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";

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
	},
}));

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");

	const handleInputChange = (e) => {
		setKeyword(e.target.value);
	};

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/products/${keyword}`);
		} else {
			navigate(`/products`);
		}
	};
	return (
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
					onChange={handleInputChange}
					onSubmit={handleSubmit}
				/>
			</Search>
		</form>
	);
};

export default SearchBox;
