const catchAsync = require("../utils/catchAsync");
const User = require("../Models/userModel");
const AppError = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "SampleID",
            url: "SampleUrl"
        }
    });
    const token = user.getJsonWebToken();
    req.user = user;
    res.status(200).cookie("token", token, { maxAge: (5 * 24 * 60 * 60 * 1000), httpOnly: true }).json({ success: true });
});

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError("Enter credentials correctly"), 500);

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new AppError("email or password is wrong", 500));

    const passwordVerify = await bcrypt.compare(password, user.password);

    if (!passwordVerify) return next(new AppError("email or password is wrong!!!", 500));

    const token = user.getJsonWebToken();
    req.user = user;

    res.status(200).cookie("token", token, { maxAge: (5 * 24 * 60 * 60 * 1000), httpOnly: true }).json({ success: true });


});

exports.logOut = catchAsync(async (req, res, next) => {
    res.cookie("token", null, { maxAge: 0, httpOnly: true });
    req.user = null;
    res.status(200).json({ success: true, message: "Logged Out" });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({}).select("-password");
    res.json(users);
});