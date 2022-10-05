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

// xem một đơn đặt hàng

exports.oneDatHang = errorServer(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email",
    )
    if (!order) {
        return next(new ErrorHandle("Không tìm thấy đơn đặt hàng"))
    }
    res.status(200).json({
        success: true,
        order
    })
})