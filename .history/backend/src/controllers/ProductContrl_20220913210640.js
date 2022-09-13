const Product = require('../models/ProductDbModel.js');



exports.taoSanPham = async (req, res, next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

}



exports.getAllProduct = (req, res)=>{
    res.status(200).json({
        message:"Route đang chạy"
    })
}