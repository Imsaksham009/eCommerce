const catchAsync = require("../utils/catchAsync");
const User = require("../Models/userModel");
const AppError = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


//Register new user
exports.registerUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: req.file.filename,
            url: req.file.path
        }
    });
    const token = user.getJsonWebToken();

    res.status(200).cookie("token", token, { maxAge: (5 * 24 * 60 * 60 * 1000), httpOnly: true }).json({ success: true, user });
});


//Login with existing user
exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!password) return next(new AppError("Enter credentials correctly"), 500);

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new AppError("email or password is wrong", 500));

    const passwordVerify = await bcrypt.compare(password, user.password);

    if (!passwordVerify) return next(new AppError("email or password is wrong!!!", 500));

    const token = user.getJsonWebToken();

    res.status(200).cookie("token", token, { maxAge: (5 * 24 * 60 * 60 * 1000), httpOnly: true }).json({ success: true, user });


});


//Logout user
exports.logOut = catchAsync(async (req, res, next) => {
    res.cookie("token", null, { maxAge: 0, httpOnly: true });
    req.user = null;
    res.status(200).json({ success: true, message: "Logged Out" });
});

//Get all user ---- Temp fun
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({}).select("-password");
    res.json(users);
});


// Forgot Password email link send
exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new AppError("User not found", 403));

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://localhost:3000/password/forgot/${resetToken}`;

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


//Reset Password using link
exports.resetPassword = catchAsync(async (req, res, next) => {
    const { resetToken } = req.params;

    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: resetTokenHash,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return next(new AppError("Something went wrong. Try to send forgot Password email again."));

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


//Get Logged In User Details
exports.getUserDetail = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
});

//Change Password
exports.changepassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const { oldpassword } = req.body;
    const passwordVerify = await bcrypt.compare(oldpassword, user.password);

    if (!passwordVerify) return next(new AppError("Entered Password is wrong. Please enter correct password", 400));

    if (req.body.password !== req.body.confirmPassword) return next(new AppError("Password doesn't match", 400));

    user.password = req.body.password;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, message: "Password changed successfully" });

});

//update Profile
exports.updateProfile = catchAsync(async (req, res, next) => {
    const { name, email } = req.body;
    const newBody = {
        name,
        email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, message: "User updated" });
});

//Get Single User Detail  ---- ADMIN
exports.getsingleuserdetail = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new AppError("User Not Found", 404));

    res.status(200).json({ success: true, user });
});

//change Role -----ADMIN
exports.updateUserRole = catchAsync(async (req, res, next) => {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, {
        new: true,
        runValidators: true
    });
    if (!user) return next(new AppError("User Not found", 404));
    res.status(200).json({ success: true, message: "User role updated", user });
});

//Delete User ----- ADMIN
exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new AppError("User Not found", 404));

    if (user.role === "admin") return next(new AppError("Admin can't be deleted", 401));

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "User Deleted" });
});