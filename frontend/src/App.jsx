/* eslint-disable  no-unused-vars */
import "./App.css";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Header from "./Components/Layout/Header/Header";
import Home from "./Components/Home/Home.jsx";
import Products from "./Components/Products/Products";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import LoginSignUp from "./Components/User/LoginSignUp.jsx";
import Logout from "./Components/User/logout";

const app = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Header />}>
			<Route index element={<Home />}></Route>
			<Route path="/home" element={<Home />}></Route>
			<Route path="/about" element={<h1>This is About Page</h1>}></Route>
			<Route path="/products" element={<Products />}></Route>
			<Route path="/products/:keyword" element={<Products />}></Route>
			<Route path="/product/:id" element={<ProductDetail />}></Route>
			<Route path="/login" element={<LoginSignUp />}></Route>
			<Route path="/logout" element={<Logout />}></Route>
			<Route path="/account" element={<h1>Account Page</h1>}></Route>
		</Route>
	)
);

export default app;
