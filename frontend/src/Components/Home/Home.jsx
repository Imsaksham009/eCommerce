/* eslint-disable  no-unused-vars */
import React, { useEffect } from "react";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
import { Link } from "react-router-dom";

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
			<section className="homeHero">
				<div className="homeHeroContent">
					<p className="heroEyebrow">Fresh Picks</p>
					<h1>Upgrade Your Everyday With Smarter Shopping</h1>
					<p>
						Explore curated products across tech, fashion, and lifestyle with
						fast discovery and premium quality.
					</p>
					<div className="heroActions">
						<a href="#featuredProducts" className="heroBtnPrimary">
							Shop Featured
						</a>
						<Link to="/products" className="heroBtnGhost">
							Browse Catalog
						</Link>
					</div>
				</div>
				<a href="#featuredProducts" className="heroScrollCue">
					<MouseOutlinedIcon fontSize="large" color="inherit" />
					<ArrowDropDownIcon fontSize="large" color="inherit" />
				</a>
			</section>

			<section id="featuredProducts" className="featuredSection">
				<div className="featuredHeadingWrap">
					<div>
						<p className="featuredEyebrow">Trending Now</p>
						<h2 className="homeHeading">Featured Products</h2>
					</div>
					<Link to="/products" className="featuredLink">
						View All
					</Link>
				</div>

				{loading ? (
					<Loader />
				) : (
					<Container fixed>
						<Grid container spacing={{ xs: 2, sm: 3 }}>
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
			</section>
		</>
	);
};

export default Home;
