import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: 999,
	border: `1px solid ${alpha(theme.palette.common.white, 0.28)}`,
	backgroundColor: alpha(theme.palette.common.white, 0.1),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.16),
	},
	width: "100%",
	maxWidth: "22rem",
	[theme.breakpoints.down("md")]: {
		maxWidth: "14rem",
	},
	[theme.breakpoints.down("sm")]: {
		maxWidth: "10.5rem",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 1.2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: alpha(theme.palette.common.white, 0.82),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(0.85, 1.1, 0.85, 0),
		paddingLeft: `calc(1em + ${theme.spacing(3.6)})`,
		transition: theme.transitions.create(["width", "opacity"]),
		fontFamily: "Outfit",
		fontSize: "0.9rem",
		width: "100%",
	},
}));

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setKeyword(e.target.value);
	};

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
			<Search>
				<SearchIconWrapper>
					<SearchIcon fontSize="small" />
				</SearchIconWrapper>
				<StyledInputBase
					placeholder="Search products"
					id="search"
					inputProps={{ "aria-label": "search" }}
					onChange={handleInputChange}
				/>
			</Search>
		</form>
	);
};

export default SearchBox;
