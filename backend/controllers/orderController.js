const Order = require("../Models/orderModel");
const productModel = require("../Models/productModel");
const Product = require("../Models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");

//create new order
async function chechStock(orderItems, problem) {

    return new Promise((resolve) => {
        orderItems.every(async (order, i = 0) => {
            const product = await Product.findById(order.product);
            if (!product) {
                problem.occur = true;
                problem.msg = "Product not find";
                resolve();
                return false;
            }

            if (order.quantity > product.stock) {
                problem.occur = true;
                problem.msg = "Not enough product";
                resolve();
                return false;
            }
            i += 1;
            if (i == orderItems.length) resolve();
        });
    });
}

exports.newOrder = catchAsync(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const problem = {
        occur: false,
        msg: "Some Error Occured"
    };

    await chechStock(orderItems, problem);

    if (problem.occur) return next(new AppError(problem.msg, 404));


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });
    orderItems.forEach(async (order) => {
        await updateStock(order.quantity, order.product,);
    });
    res.status(201).json({ success: true, order });
});



//get single order
exports.getSingleOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return next(new AppError("Order not found", 404));

    res.status(200).json({ success: true, order });
});

exports.myOrders = catchAsync(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });
    if (!order) return next(new AppError("Order not found", 404));

    res.status(200).json({ success: true, order });
});

//all orders ---- Admin
exports.allOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find();
    if (!orders) return next(new AppError("Order not found", 404));

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({ success: true, orders, totalAmount });
});

//update order
exports.updateOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new AppError("Order not found", 404));
    if (order.orderStatus === "Delivered") return next(new AppError("This Order id already delivered", 400));


    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") order.deliveredAt = Date.now();

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true });
});
const updateStock = async (quantity, id) => {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
};

//delete Order ---- Admin
exports.deleteOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) return next(new AppError("Order Not Found", 404));

    res.status(200).json({ success: true });
});
