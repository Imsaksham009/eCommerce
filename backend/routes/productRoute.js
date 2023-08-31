const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct, getDetails, addReview } = require("../controllers/productController");
const { isAuthenticated, isAdmin, isProductAuthor } = require("../Middleware/auth");
const router = express.Router();

//Get Products
router.get("/products", getProducts);

//Get Product Details
router.get("/product/details/:id", getDetails);

//Add Product ----- Admin Route
router.post("/admin/product/new", isAuthenticated, isAdmin, addProduct);

//Update Product ----- Admin Route
router.put("/admin/product/edit/:id", isAuthenticated, isAdmin, isProductAuthor, updateProduct);

//Delete Product ----- Admin Route
router.delete("/admin/product/delete/:id", isAuthenticated, isAdmin, isProductAuthor, deleteProduct);




module.exports = router;