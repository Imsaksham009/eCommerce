import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getProducts,
} from "../../reducers/Products/productAction";

import Loader from "../Loader/Loader";
import ProductCard from "../Home/Products/ProductCard";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Box } from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "./products.css";

//constants
const categories = [
	"Laptop",
	"Smartphones",
	"Footwear",
	"Camera",
	"Monitor",
	"Games",
	"Gym",
];

const Products = () => {
	//Params Value
	const { keyword } = useParams();
	//Dispatch Fun
	const dispatch = useDispatch();

	//constants
	const [page, setPage] = useState(1);
	const [price, setPrice] = useState([1, 2500]);
	const [categ, setCateg] = useState("");
	const { products, loading, error, totalCount } = useSelector(
		(state) => state.productsReducer
	);
	let totalPages = totalCount ? Number(Math.ceil(totalCount / 8)) : 1;

	//Page Change handler
	const handlePageChange = (event, value) => {
		setPage(value);
	};

	//price change handler
	const handlePriceChange = (e, newVal) => {
		setPrice(newVal);
	};

	//category change handler
	const handleCategChange = (e, category) => {
		setCateg(category);
	};

	//UseEffect for products
	useEffect(() => {
		getProducts(dispatch, keyword, page, price, categ);
	}, [dispatch, keyword, page, price, categ]);

	//useEffect for Errors
	useEffect(() => {
		if (error) {
			toast.error(error);
			clearErrors(dispatch);
		}
	}, [dispatch, error, page]);

	return (
		<div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<h2 className="productsHeading">Products</h2>
			{loading ? (
				<Loader />
			) : (
				<Container sx={{ width: "69%", minHeight: "30vh" }}>
					<Grid
						container
						spacing={2}
						justifyContent="center"
						alignItems="center"
					>
						{products &&
							products.map((product) => {
								return (
									<Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
										<ProductCard product={product} />
									</Grid>
								);
							})}
					</Grid>
				</Container>
			)}
			<div className="filterBox">
				<Box sx={{ marginBottom: "1vmax", marginTop: "0.3vmax" }}>
					<Typography variant="h5" sx={{ marginBottom: "0.8vmax" }}>
						Filters
					</Typography>
					<Typography variant="h7">Price</Typography>
					<Slider
						sx={{ marginLeft: "0.5vmax" }}
						getAriaLabel={() => "Price Range"}
						value={price}
						onChangeCommitted={handlePriceChange}
						valueLabelDisplay="auto"
						min={1}
						max={2500}
						// getAriaValueText={valuetext}
					/>
				</Box>
				<Box>
					<Typography variant="h7">Categories</Typography>
					<ul className="categoryBox">
						{categories.map((category) => {
							return (
								<li
									className="category-link"
									key={category}
									onClick={(e) => {
										handleCategChange(e, category);
									}}
								>
									{category}
								</li>
							);
						})}
					</ul>
				</Box>
			</div>

			<div className="paginationBox">
				<Stack spacing={2}>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
					/>
				</Stack>
			</div>
		</div>
	);
};

export default Products;
