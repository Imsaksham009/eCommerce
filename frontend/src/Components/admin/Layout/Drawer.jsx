import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./dr.css";
import {
	getOrders,
	getProducts,
	getUsers,
} from "../../../reducers/Admin/adminAction";

const drawerWidth = window.innerWidth < 600 ? 50 : 200;

export default function ClippedDrawer() {
	const items = [
		{
			name: "DashBoard",
			icon: <DashboardIcon />,
			link: "/admin/dashboard",
		},
		{
			name: "Orders",
			icon: <ReceiptIcon />,
			link: "/admin/orders",
		},
		{
			name: "Users",
			icon: <PersonOutlineIcon />,
			link: "/admin/users",
		},
		{
			name: "Reviews",
			icon: <BorderColorIcon />,
			link: "/admin/reviews",
		},
		{
			name: "All Products",
			icon: <Inventory2Icon />,
			link: "/admin/allproducts",
		},
		{
			name: "Create New Product",
			icon: <CreateNewFolderIcon />,
			link: "/admin/newproduct",
		},
	];
	const navigate = useNavigate();
	const dispatch = useDispatch();

	React.useEffect(() => {
		getUsers(dispatch);
		getProducts(dispatch);
		getOrders(dispatch);
	}, [dispatch]);
	return (
		<Box
			sx={{
				display: "flex",
				minHeight: "100vh",
				maxWidth: "100vw",
			}}
		>
			<Drawer
				variant="permanent"
				sx={{
					zIndex: 1,
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{items.map((item, index) => (
							<ListItem key={item.name} disablePadding>
								<ListItemButton onClick={() => navigate(item.link)}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText
										style={{ textDecoration: "none", color: "Grey" }}
										primary={item.name}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Outlet />
			</Box>
		</Box>
	);
}
