const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct, getDetails } = require("../controllers/productController");
const router = express.Router();

//Get Products
router.get("/products", getProducts);

//Get Product Details
router.get("/product/details/:id", getDetails);

//Add Product ----- Admin Route
router.post("/product/new", addProduct);

//Update Product ----- Admin Route
router.put("/product/edit/:id", updateProduct);

//Delete Product ----- Admin Route
router.delete("/product/delete/:id", deleteProduct);

module.exports = router;