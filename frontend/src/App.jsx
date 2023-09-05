import "./App.css";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Header from "./Components/Layout/Header/Header";
import Home from "./Components/Home/Home.jsx";

const app = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Header />}>
			<Route index element={<Home />}></Route>
			<Route path="/about" element={<h1>This is About Page</h1>}></Route>
		</Route>
	)
);

export default app;
