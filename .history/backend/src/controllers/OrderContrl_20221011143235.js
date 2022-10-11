const errorServer = require("../middleware/errorServer");
const Order = require("../models/OrderModel");
const ErrorHandle = require("../untils/errorHandle");
const Product = require('../models/ProductDbModel.js');



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

// xem tất cả đơn đặt hàng
exports.tatCaDonDatHang = errorServer(async (req,res,next) =>{
    const order = await Order.find({user: req.user._id});
    res.status(200).json({
        success: true,
        order
    });
});

// admin xem tất cả các đơn hàng
exports.adminTatCaDonHang = errorServer(async (req,res,next) =>{
    const adminDonHang = await Order.find();

    let tongSoTien = 0;

    adminDonHang.forEach((order) =>{
        tongSoTien += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        tongSoTien,
        adminDonHang
    });
});
// // admin cập nhật trạng thái của đơn đặt hàng
// exports.adminCapNhatDatHang = errorServer(async (req, res, next) => {

//     const order = await Order.findById(req.params.id);
  
//     if (!order) {
//       return next(new ErrorHandle("Không tìm thấy đơn đặt hàng", 404));
//     }
  
//     if (order.orderStatus === "Delivered") {
//       return next(new ErrorHandle("Bạn đã giao đơn hàng này", 400));
//     }
  
//     if (req.body.status === "Shipped") {
//       order.orderItems.forEach(async (o) => {
//         await updateStock(o.product, o.quantity);
//       });
//     }
//     order.orderStatus = req.body.status;
  
//     if (req.body.status === "Delivered") {
//       order.deliveredAt = Date.now();
//     }
  
//     await order.save({ validateBeforeSave: false });
//     res.status(200).json({
//       success: true,
//     });
//   });
  
//   async function updateStock(id, quantity) {
      
//     const product = await Product.findById(id);
  
//     product.Stock -= quantity;
  
//     await product.save({ validateBeforeSave: false });
//   }

// admin xóa đơn đặt hàng



exports.xoaDonDatHang = errorServer(async (req,res,next)=>{
  const order = await Order.findById(req.params.id)

  if(!order){
    return next(new ErrorHandle("Không tìm thấy đơn đặt hàng",404))
  }
  await order.remove()
  res.status(200).json({
    success: true
    
  })
})