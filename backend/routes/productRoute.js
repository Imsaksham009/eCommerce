const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct, getDetails, addReview, getAllProducts } = require("../controllers/productController");
const { isAuthenticated, isAdmin, isProductAuthor } = require("../Middleware/auth");
const { productsStorage } = require("../cloudinary/index");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: productsStorage });

//Get Products
router.get("/products", getProducts);

//Get All Products ----- Admin
router.get("/admin/products", isAuthenticated, isAdmin, getAllProducts);

//Get Product Details
router.get("/product/details/:id", getDetails);

//Add Product ----- Admin Route
router.post("/admin/product/new", isAuthenticated, isAdmin, upload.single("productimage"), addProduct);

//Update Product ----- Admin Route
router.put("/admin/product/edit/:id", isAuthenticated, isAdmin, isProductAuthor, upload.single("productimage"), updateProduct);

//Delete Product ----- Admin Route
router.delete("/admin/product/delete/:id", isAuthenticated, isAdmin, isProductAuthor, deleteProduct);




module.exports = router;