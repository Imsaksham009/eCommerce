const Product = require("../Models/productModel");
const AppError = require("../utils/error");

// Get All Products
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (e) {
        return next(new AppError("Internal Error", 500));
    }
    next();
};

// Get Product details
exports.getDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(new AppError("Product not Found", 500));
        res.status(200).json({ success: true, product });
    } catch (e) {
        return next(new AppError("Internal Error", 500));
    }
    next();
};

//Add Product Route ---- Admin
exports.addProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(200, { success: true, product });
    } catch (e) {
        return next(new AppError("Internal Error", 500));
    }
    next();
};

// Edit Product ---- Admin
exports.updateProduct = async (req, res, next) => {
    try {
        let foundProduct = await Product.findById(req.params.id);

        if (!foundProduct) {
            return next(new AppError("Product not found", 500));
        }

        foundProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });

        res.status(200).json({ success: true, foundProduct });
    } catch (e) {
        return next(new AppError("Internal Error", 500));
    }
    next();

};

// Delete Product ---- Admin
exports.deleteProduct = async (req, res, next) => {
    try {
        let foundProduct = await Product.findById(req.params.id);

        if (!foundProduct) {
            return res.staus(500).json({ success: false, message: `Product not found` });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, foundProduct });
    } catch (e) {
        return next(new AppError("Internal Error", 500));
    }
    next();

};
