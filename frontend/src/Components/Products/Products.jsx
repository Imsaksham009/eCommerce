import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getProducts,
} from "../../reducers/Products/productAction";

import Loader from "../Loader/Loader";
import ProductCard from "../Home/Products/ProductCard";

import Pagination from "@mui/material/Pagination";
import Slider from "@mui/material/Slider";

import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "./products.css";

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
	const { keyword } = useParams();
	const dispatch = useDispatch();

	const [page, setPage] = useState(1);
	const [price, setPrice] = useState([1, 2500]);
	const [categ, setCateg] = useState("");
	const { products, loading, error, totalCount } = useSelector(
		(state) => state.productsReducer,
	);

	const totalPages = totalCount ? Number(Math.ceil(totalCount / 8)) : 1;

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const handlePriceChange = (event, newVal) => {
		setPrice(newVal);
		setPage(1);
	};

	const handleCategoryChange = (category) => {
		setCateg(category);
		setPage(1);
	};

	const handleResetFilters = () => {
		setPrice([1, 2500]);
		setCateg("");
		setPage(1);
	};

	useEffect(() => {
		getProducts(dispatch, keyword, page, price, categ);
	}, [dispatch, keyword, page, price, categ]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearErrors(dispatch);
		}
	}, [dispatch, error]);

	return (
		<div className="productsPage">
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

			<section className="productsHero">
				<p className="productsEyebrow">Collection</p>
				<h2 className="productsHeading">Find Products You Will Love</h2>
				<p>
					{keyword
						? `Showing results for "${keyword}"`
						: "Browse our full catalog with dynamic filters and curated categories."}
				</p>
			</section>

			<div className="productsLayout">
				<aside className="filterBox">
					<div className="filterBlock">
						<p className="filterLabel">Price Range</p>
						<div className="priceMeta">
							<span>Rs. {price[0]}</span>
							<span>Rs. {price[1]}</span>
						</div>
						<Slider
							className="priceSlider"
							getAriaLabel={() => "Price Range"}
							value={price}
							onChangeCommitted={handlePriceChange}
							valueLabelDisplay="auto"
							min={1}
							max={2500}
						/>
					</div>

					<div className="filterBlock">
						<p className="filterLabel">Categories</p>
						<div className="categoryBox">
							<button
								type="button"
								className={`category-link ${categ === "" ? "active" : ""}`}
								onClick={() => handleCategoryChange("")}
							>
								All Products
							</button>
							{categories.map((category) => {
								return (
									<button
										type="button"
										className={`category-link ${
											categ === category ? "active" : ""
										}`}
										key={category}
										onClick={() => handleCategoryChange(category)}
									>
										{category}
									</button>
								);
							})}
						</div>
					</div>

					<button
						type="button"
						className="resetFiltersBtn"
						onClick={handleResetFilters}
					>
						Reset Filters
					</button>
				</aside>

				<section className="productsContent">
					{loading ? (
						<Loader />
					) : products && products.length > 0 ? (
						<Container disableGutters>
							<Grid container spacing={{ xs: 2, sm: 2.5 }}>
								{products.map((product) => {
									return (
										<Grid key={product._id} item xs={12} sm={6} md={6} lg={4}>
											<ProductCard product={product} />
										</Grid>
									);
								})}
							</Grid>
						</Container>
					) : (
						<div className="productsEmptyState">
							<h3>No products found</h3>
							<p>Try a different price range or reset your filters.</p>
						</div>
					)}
				</section>
			</div>

			{!loading && totalPages > 1 && (
				<div className="paginationBox">
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color="primary"
						shape="rounded"
					/>
				</div>
			)}
		</div>
	);
};

export default Products;
