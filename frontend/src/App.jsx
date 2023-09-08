/* eslint-disable  no-unused-vars */
import "./App.css";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Header from "./Components/Layout/Header/Header";
import Home from "./Components/Home/Home.jsx";
import Product from "./Components/ProductDetail/ProductDetail.jsx";
import ProductDetail from "./Components/ProductDetail/ProductDetail.jsx";

const app = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Header />}>
			<Route index element={<Home />}></Route>
			<Route path="/home" element={<Home />}></Route>
			<Route path="/about" element={<h1>This is About Page</h1>}></Route>
			<Route path="/product/:id" element={<ProductDetail />}></Route>
		</Route>
	)
);

export default app;
