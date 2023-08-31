const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");
const Review = require("../Models/reviewModel");

exports.isAuthenticated = catchAsync(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(new AppError("Login to access the resource"), 401);

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedUser.id);
    next();
});

exports.isProductAuthor = catchAsync(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(new AppError("Login to access the resource"), 401);

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedUser.id);

    const product = await Product.findById(req.params.id);
    if (!product) return next(new AppError("Product Not Found", 404));

    if (product.user != req.user.id) return next(new AppError("Not Allowed", 403));

    next();
});

exports.isReviewAuthor = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.reviewid);
    if (!review) return next(new AppError("Review not found", 404));

    if (review.user.toString() !== req.user._id.toString())
        return next(new AppError("Not authorized to delete other user review", 403));

    next();
});


exports.isAdmin = catchAsync(async (req, res, next) => {
    if (req.user && !(req.user.role === "admin")) {
        return next(new AppError(`Role: ${req.user.role} is not allowed to access this resource`), 403);
    }
    next();
});