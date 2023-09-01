const express = require("express");
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require("../controllers/orderController.js");
const { isAuthenticated, isAdmin, isOrderAuthor } = require("../Middleware/auth");

const router = express.Router();

//new Order route
router.post("/new", isAuthenticated, newOrder);

//get my orders
router.get("/myorders", isAuthenticated, myOrders);

//all orders ---- Admin
router.get("/admin/orders", isAuthenticated, isAdmin, allOrders);

//single order details ---- author or admin
router.get("/orderdetail/:id", isAuthenticated, isOrderAuthor, getSingleOrder);

//update order
router.put("/admin/updateorder/:id", isAuthenticated, isAdmin, updateOrder);

router.delete("/admin/deleteorder/:id", isAuthenticated, isAdmin, deleteOrder);




module.exports = router;