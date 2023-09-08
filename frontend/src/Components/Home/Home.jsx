/* eslint-disable  no-unused-vars */
import React, { useEffect } from "react";
import MouseIcon from "@mui/icons-material/Mouse";
import ProductCard from "./Products/ProductCard";
import "./home.css";
import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	getProducts,
	clearErrors,
} from "../../reducers/Products/productAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import { clearAllErrors } from "../../reducers/Products/productReducer";

const Home = () => {
	const dispatch = useDispatch();

	const { products, loading, error } = useSelector(
		(state) => state.productsReducer
	);

	useEffect(() => {
		getProducts(dispatch);
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearErrors(dispatch);
		}
	}, [error, dispatch]);

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
					<Loader />
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
