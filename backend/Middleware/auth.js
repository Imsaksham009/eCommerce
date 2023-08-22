const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.isAuthenticated = catchAsync(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(new AppError("Login to access the resource"), 401);

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedUser.id);
    next();
});


exports.isAdmin = catchAsync(async (req, res, next) => {
    if (req.user && !(req.user.role === "admin")) {
        return next(new AppError(`Role: ${req.user.role} is not allowed to access this resource`), 403);
    }
    next();
});