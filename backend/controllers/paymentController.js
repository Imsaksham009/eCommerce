const catchAsync = require("../utils/catchAsync");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { AppError } = require("../utils/error");
//RZP_Instance
const instance = new Razorpay({
    key_id: process.env.RZP_KEY,
    key_secret: process.env.RZP_SKEY
});


exports.createPaymentOrder = catchAsync(async (req, res, next) => {
    const options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",
    };

    const newOrder = await instance.orders.create(options);
    res.status(200).json({ message: "success", newOrder });

});

exports.verifypayment = catchAsync(async (req, res, next) => {
    const { oid, pid, sign } = req.body;
    const hmac = crypto.createHmac("sha256", process.env.RZP_SKEY);
    const genSign = hmac.update(oid + "|" + pid).digest("hex");
    if (genSign !== sign) return next(new AppError("Payment Not Verified. Try Again", 500));
    res.status(200).json({ success: true });
});
