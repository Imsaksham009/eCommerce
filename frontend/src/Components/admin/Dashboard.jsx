import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	Chart as ChartJS,
	ArcElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

import "./dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
		},
	},
};

const Dashboard = () => {
	const { products, users, orders } = useSelector(
		(state) => state.adminReducer
	);
	let outOfStock = 0;

	products &&
		products.forEach((item) => {
			if (item.stock === 0) {
				outOfStock += 1;
			}
		});

	let totalAmount = 0;
	orders &&
		orders.forEach((order) => {
			totalAmount += order.totalPrice;
		});
	const lineState = {
		labels: ["Initial Amount", "Amount Earned"],
		datasets: [
			{
				label: "TOTAL AMOUNT",
				backgroundColor: ["tomato"],
				hoverBackgroundColor: ["rgb(197, 72, 49)"],
				data: [0, totalAmount],
			},
		],
	};

	const doughnutState = {
		labels: ["Out of Stock", "InStock"],
		datasets: [
			{
				backgroundColor: ["#00A6B4", "#6800B4"],
				hoverBackgroundColor: ["#4B5000", "#35014F"],
				data: [outOfStock, products.length - outOfStock],
			},
		],
	};

	return (
		<>
			<div className="dashboard">
				<div className="dashboardContainer">
					<Typography component="h1">Dashboard</Typography>

					<div className="dashboardSummary">
						<div>
							<p>
								Total Amount <br /> ₹{totalAmount}
							</p>
						</div>
						<div className="dashboardSummaryBox2">
							<Link to="/admin/allproducts">
								<p>Product</p>
								<p>{products && products.length}</p>
							</Link>
							<Link to="/admin/orders">
								<p>Orders</p>
								<p>{orders && orders.length}</p>
							</Link>
							<Link to="/admin/users">
								<p>Users</p>
								<p>{users && users.length}</p>
							</Link>
						</div>
					</div>

					<div className="lineChart">
						<Line data={lineState} options={options} />
					</div>

					<div className="doughnutChart">
						<Doughnut data={doughnutState} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
