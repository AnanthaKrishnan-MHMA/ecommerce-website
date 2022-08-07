const Order = require('../models/order.model');
const Product = require('../models/product.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// creating new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        // what if it is cash on delivery? maybe we don't have it
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order,
    });
});

// get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("order not found", 404));
    }
    res.status(200).json({
        success: true,
        order
    })
});

// get loggedin user orders
exports.getMyOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    // no need to check existance of orders. If a person
    // dosent have orders then we will show blank space.
    res.status(200).json({
        success: true,
        orders
    })
});

// get all order
exports.getAllOrder = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find({}).populate("user", "name email");
    if (!orders) {
        return next(new ErrorHandler("no orders yet", 404));
    }
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});
// update order
exports.updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("invalid order id", 400))
    }
    if (order.orderStatus === "delivered") {
        return next(new ErrorHandler("order already delivered", 400))
    }
    order.orderStatus = req.body.status;
    // updating product stock
    if (req.body.status === "delivered") {
        order.deliveredAt = Date.now();
        order.orderItems.forEach(async (item) => {
            let product = await Product.findById(item.product);
            product.stock -= item.quantity;
            await product.save({ validateBeforeSave: false });
        })
    }
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        order
    })
})
// delete order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("invalid order id", 400))
    }
    order.remove();
    res.status(200).json({
        success: true,
        message: "order deleted successfully"
    })
})