import React from "react";
import MouseIcon from "@mui/icons-material/Mouse";
import ProductCard from "./ProductCard";
import "./home.css";
import { Container, Grid } from "@mui/material";

const products = [
	{
		_id: 1,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 2,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 3,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 4,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 5,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 6,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 7,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 8,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 9,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 10,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
	{
		_id: 11,
		name: "Laptop",
		imageUrl: "https://i.ibb.co/DRST11n/1.webp",
		price: "3000",
	},
];

const Home = () => {
	return (
		<>
			<div className="banner">
				<h2>Welcome to eCommerce</h2>
				<h1>FIND AMAZING PRODUCTS BELOW</h1>

				<a href="#container">
					<button>
						Scroll <MouseIcon />
					</button>
				</a>
			</div>

			<h2 className="homeHeading">Featured Products</h2>

			<Container fixed id="container">
				<Grid container spacing={1}>
					{products.map((product) => {
						return (
							<Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
								<ProductCard product={product} />
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</>
	);
};

export default Home;
