const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct, getDetails } = require("../controllers/productController");
const { isAuthenticated, isAdmin } = require("../Middleware/auth");
const router = express.Router();

//Get Products
router.get("/products", getProducts);

//Get Product Details
router.get("/product/details/:id", getDetails);

//Add Product ----- Admin Route
router.post("/product/new", isAuthenticated, isAdmin, addProduct);

//Update Product ----- Admin Route
router.put("/product/edit/:id", isAuthenticated, isAdmin, updateProduct);

//Delete Product ----- Admin Route
router.delete("/product/delete/:id", isAuthenticated, isAdmin, deleteProduct);

module.exports = router;