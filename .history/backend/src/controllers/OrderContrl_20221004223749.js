const errorServer = require("../middleware/errorServer");
const Order = require("../models/OrderModel");
const ErrorHandle = require("../untils/errorHandle");



// tạo đặt hàng
exports.datHang = errorServer(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user: req.user._id,
    })
    res.status(201).json({
        success: true,
        order,
    });
})