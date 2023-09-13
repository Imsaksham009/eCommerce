/* eslint-disable  no-unused-vars */
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
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Account from "./Components/User/Account/Account";
import UpdatePassword from "./Components/User/UpdatePassword/UpdatePassword.jsx";
import ForgotPass from "./Components/User/ForgotPassword/ForgotPass.jsx";
import ForgotPassTok from "./Components/User/ForgotPassword/ForgotPassTok.jsx";

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
			<Route
				path="/account"
				element={
					<ProtectedRoute>
						<Account />
					</ProtectedRoute>
				}
			></Route>
			<Route
				path="/me/password/update"
				element={
					<ProtectedRoute>
						<UpdatePassword />
					</ProtectedRoute>
				}
			></Route>
			<Route path="*" element={<h1>Error Page</h1>}></Route>
		</Route>
	)
);

export default app;

/**
 TODO'S

 1. Update Profile
 2. Reset Password
 */
