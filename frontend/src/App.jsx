/* eslint-disable  no-unused-vars */
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import Header from "./Components/Layout/Header/Header";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import LoginSignUp from "./Components/User/LoginSignUp";
import Logout from "./Components/User/logout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Account from "./Components/User/Account/Account";
import UpdatePassword from "./Components/User/UpdatePassword/UpdatePassword";
import ForgotPass from "./Components/User/ForgotPassword/ForgotPass";
import ForgotPassTok from "./Components/User/ForgotPassword/ForgotPassTok";
import Cart from "./Components/Cart/Cart";
import ShippingInfo from "./Components/Cart/ShippingInfo";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import Payment from "./Components/Cart/Payment";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import Orders from "./Components/Order/Orders";
import OrderDetail from "./Components/Order/OrderDetail.jsx";

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
			<Route path="/password/forgot" element={<ForgotPass />}></Route>
			<Route path="/password/forgot/:token" element={<ForgotPassTok />}></Route>
			<Route path="/cart" element={<Cart />}></Route>

			<Route element={<ProtectedRoute />}>
				<Route path="/account" element={<Account />}></Route>
				<Route path="/me/password/update" element={<UpdatePassword />}></Route>
				<Route path="/shipping" element={<ShippingInfo />}></Route>
				<Route path="/order/confirm" element={<ConfirmOrder />}></Route>
				<Route path="/payment" element={<Payment />}></Route>
				<Route path="/success" element={<OrderSuccess />}></Route>
				<Route path="/orders/me" element={<Orders />}></Route>
				<Route path="/orders" element={<Orders />}></Route>
				<Route path="/order/:id" element={<OrderDetail />}></Route>
			</Route>

			<Route path="*" element={<h1>Error Page</h1>}></Route>
		</Route>
	)
);

export default app;

/**
 TODO'S

 1. Update Profile
 2. Razorpay integrate
 */
