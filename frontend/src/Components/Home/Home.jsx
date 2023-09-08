/* eslint-disable  no-unused-vars */
import React, { useEffect } from "react";
import MouseIcon from "@mui/icons-material/Mouse";
import ProductCard from "./ProductCard";
import "./home.css";
import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reducers/Products/productAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import loader from "../Layout/Loader/loader.gif";
const Home = () => {
	const dispatch = useDispatch();

	const { products, loading, error } = useSelector(
		(state) => state.productsReducer
	);

	useEffect(() => {
		if (error) {
			toast.error(`Error: ${error}`);
			return;
		}
		getProducts(dispatch);
	}, [dispatch, error]);

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<div className="banner">
				<h2>Welcome to eCommerce</h2>
				<h1>FIND AMAZING PRODUCTS BELOW</h1>

				<a href="#container">
					<button>
						Scroll <MouseIcon />
					</button>
				</a>
			</div>
			<div id="container">
				<h2 className="homeHeading">Featured Products</h2>
				{loading ? (
					<>
						<img
							src={loader}
							alt="loading"
							style={{
								margin: "0% 46%",
								width: "130px",
								height: "130px",
							}}
						/>
					</>
				) : (
					<Container fixed>
						<Grid container spacing={1}>
							{products &&
								products.map((product) => {
									return (
										<Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
											<ProductCard product={product} />
										</Grid>
									);
								})}
						</Grid>
					</Container>
				)}
			</div>
		</>
	);
};

export default Home;
