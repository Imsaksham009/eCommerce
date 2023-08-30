const catchAsync = require("../utils/catchAsync");
const User = require("../Models/userModel");
const AppError = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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
    const { password: pswd, ...userRest } = user._doc;
    req.user = userRest;
    res.status(200).cookie("token", token, { maxAge: (5 * 24 * 60 * 60 * 1000), httpOnly: true }).json({ success: true });
});

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!password) return next(new AppError("Enter credentials correctly"), 500);

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new AppError("email or password is wrong", 500));

    const passwordVerify = await bcrypt.compare(password, user.password);

    if (!passwordVerify) return next(new AppError("email or password is wrong!!!", 500));

    const token = user.getJsonWebToken();

    const { password: pswd, ...userRest } = user._doc;
    req.user = userRest;

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new AppError("User not found", 403));

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${resetToken}`;

    const message = `Click on the url below to reset the password:\n\n\n url:- ${resetUrl}. \n\n\nIf Password reset not requested by you then please igonre this email`;

    try {
        await sendEmail({
            email: user.email,
            subject: "eCommerce account Password reset",
            message
        });

        return res.status(200).json({ success: true, message: "Email Sent!" });

    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError(err.message, 500));
    }

});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { resetToken } = req.params;

    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: resetTokenHash,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return next(new AppError("Something went wrong. Try to send email again."));

    if (req.body.password !== req.body.confirmPassword) {
        return next(new AppError("Password do not match.", 403));
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, message: "Password is changed" });

    next();
});