const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");
const Review = require("../Models/reviewModel");
const Order = require("../Models/orderModel");

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

exports.isOrderAuthor = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new AppError("Order not Found", 404));

    if (req.user.role === "admin" || order.user.toString() === req.user._id.toString()) return next();

    return next(new AppError("Not authorised to see others order", 403));


});


exports.isAdmin = catchAsync(async (req, res, next) => {
    if (req.user && !(req.user.role === "admin")) {
        return next(new AppError(`Role: ${req.user.role} is not allowed to access this resource`), 403);
    }
    next();
});