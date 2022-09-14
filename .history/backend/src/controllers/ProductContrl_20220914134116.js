const Product = require('../models/ProductDbModel.js');
const ErrorHandle = require('../untils/errorHandle.js');
const errorServer = require('../middleware/errorServer')
const Feture = require('../untils/Features')


//Admin có thể tạo sản phẩm
exports.taoSanPham = errorServer(async (req, res, next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

});


// xem tất cả sản phẩm
exports.xemSanPham = async (req, res)=>{
    const pageResult = 8
    const giaSanPham = await Product.countDocuments()
    const feature = new Feture(Product.find(), req.query).search().filters().phanLoai(pageResult)
  const products = await feature.query
  res.status(200).json({
    success: true,
    products,
  })
};

// Admin có thể cập nhật sản phẩm
exports.capNhatSanPham = errorServer(async (req, res, next) => {
    let updateProduct = await Product.findById(req.params.id)
    if (!updateProduct) {
        return next(new ErrorHandle('Khong tim thay san pham',404))
    }
    updateProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useUnified: false
    })
    res.status(200).json({
        success: true,
        updateProduct
    })
})

// Admin có thể xóa sản phẩm
exports.xoaSanPham = errorServer(async (req, res, next) =>{
    const deleteProduct = await Product.findById(req.params.id)
    if (!deleteProduct) {
        return next(new ErrorHandle('Khong tim thay san pham',404))
    }
    await deleteProduct.remove();
    res.status(200).json({
        success: true,
        message: 'San pham da duoc xoa'
    })
});


// xem xét 1 sản phẩm
exports.xemXetSanPham = errorServer(async (req, res, next) =>{
    const getProduct = await Product.findById(req.params.id)
    if (!getProduct) {
        return next(new ErrorHandle('Khong tim thay san pham',404))
    }
    res.status(200).json({
        success: true,
        getProduct,
        giaSanPham
    })
});
