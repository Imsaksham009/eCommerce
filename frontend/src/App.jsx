import "./App.css";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Header from "./Components/Header/Header";

const app = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Header />}>
			<Route index element={<h1>This is Home Page</h1>}></Route>
			<Route path="/about" element={<h1>This is About Page</h1>}></Route>
		</Route>
	)
);

export default app;
