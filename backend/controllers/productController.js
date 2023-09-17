const Product = require("../Models/productModel");
const Review = require("../Models/reviewModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");

// Get All Products
exports.getProducts = catchAsync(async (req, res, next) => {
    // return next(new AppError("Temp Error", 500));
    const resultPerPage = 8;
    const totalCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product, req.query);
    let result = apifeature.search().filter().pagination(resultPerPage);
    const products = await result.query;
    res.status(200).json({ success: true, totalCount, products });
});

// Get Product details
exports.getDetails = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate("reviews");
    if (!product) return next(new AppError("Product not Found", 500));
    res.status(200).json({ success: true, product });
});

//Get All Products
exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find({});
    if (!products) return next(new AppError("Products Not Found", 404));
    res.status(200).json(products);
});

//Add Product Route ---- Admin
exports.addProduct = catchAsync(async (req, res, next) => {
    const { name, description, price, category, stock } = req.body;
    const product = new Product({
        name, description, price, category, stock,
        images: [
            {
                public_id: req.file.filename,
                url: req.file.path
            }
        ]
    });
    product.user = req.user.id;
    await product.save();
    res.status(200).json({ success: true, product });
});

// Edit Product ---- Admin
exports.updateProduct = catchAsync(async (req, res, next) => {
    let foundProduct = await Product.findById(req.params.id);

    if (!foundProduct) {
        return next(new AppError("Product not found", 500));
    }

    foundProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    });

    res.status(200).json({ success: true, foundProduct });

});

// Delete Product ---- Admin
exports.deleteProduct = catchAsync(async (req, res, next) => {

    let foundProduct = await Product.findById(req.params.id);

    if (!foundProduct) {
        return next(new AppError("Product not found", 404));
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, foundProduct });
});


