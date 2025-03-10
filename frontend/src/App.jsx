/* eslint-disable  no-unused-vars */
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import AdminEditProduct from "./Components/admin/AdminEditProduct";
import AdminEditUser from "./Components/admin/AdminEditUser";
import AdminNewProduct from "./Components/admin/AdminNewProduct";
import AdminOrders from "./Components/admin/AdminOrders";
import AdminProcessOrder from "./Components/admin/AdminProcessOrder";
import AdminUsers from "./Components/admin/AdminUsers";
import DashBoard from "./Components/admin/Dashboard.jsx";
import SideDrawer from "./Components/admin/Layout/Drawer";
import AdminProducts from "./Components/admin/Products";
import Cart from "./Components/Cart/Cart";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import Payment from "./Components/Cart/Payment";
import ShippingInfo from "./Components/Cart/ShippingInfo";
import Home from "./Components/Home/Home";
import Contact from "./Components/Layout/Contact/Contact";
import ErrorPage from "./Components/Layout/ErrorPage";
import Header from "./Components/Layout/Header/Header";
import OrderDetail from "./Components/Order/OrderDetail";
import Orders from "./Components/Order/Orders";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Products from "./Components/Products/Products";
import AdminRoute from "./Components/ProtectedRoute/AdminRoute";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Account from "./Components/User/Account/Account";
import ForgotPass from "./Components/User/ForgotPassword/ForgotPass";
import ForgotPassTok from "./Components/User/ForgotPassword/ForgotPassTok";
import LoginSignUp from "./Components/User/LoginSignUp";
import Logout from "./Components/User/logout";
import UpdatePassword from "./Components/User/UpdatePassword/UpdatePassword";

const app = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Header />}>
			<Route index element={<Home />}></Route>
			<Route path="home" element={<Home />}></Route>
			<Route path="/about" element={<h1>This is About Page</h1>}></Route>
			<Route path="/products" element={<Products />}></Route>
			<Route path="/products/:keyword" element={<Products />}></Route>
			<Route path="/product/:id" element={<ProductDetail />}></Route>
			<Route path="/login" element={<LoginSignUp />}></Route>
			<Route path="/logout" element={<Logout />}></Route>
			<Route path="/password/forgot" element={<ForgotPass />}></Route>
			<Route path="/password/forgot/:token" element={<ForgotPassTok />}></Route>
			<Route path="/cart" element={<Cart />}></Route>
			<Route path="/contact" element={<Contact />}></Route>

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
				<Route element={<AdminRoute />}>
					<Route path="/admin" element={<SideDrawer />}>
						<Route index element={<DashBoard />}></Route>={" "}
						<Route path="dashboard" element={<DashBoard />}></Route>
						<Route path="allproducts" element={<AdminProducts />}></Route>
						<Route path="orders" element={<AdminOrders />}></Route>
						<Route path="order/:id" element={<AdminProcessOrder />}></Route>
						<Route path="newproduct" element={<AdminNewProduct />}></Route>
						<Route path="product/:id" element={<AdminEditProduct />}></Route>
						<Route path="users" element={<AdminUsers />}></Route>
						<Route path="user/:id" element={<AdminEditUser />}></Route>
					</Route>
				</Route>
			</Route>

			<Route path="*" element={<ErrorPage />}></Route>
		</Route>
	)
);

export default app;

/**
 TODO'S

 1. Update Profile
 2. Razorpay integrate
 3. CMS Portal
 */
