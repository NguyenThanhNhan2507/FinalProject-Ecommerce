const Product = require('../models/ProductDbModel.js');



//Admin có thể tạo sản phẩm
exports.taoSanPham = async (req, res, next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

};


// xem tất cả sản phẩm
exports.xemSanPham = async (req, res)=>{
  const products = await Product.find()
  res.status(200).json({
    success: true,
    products
  })
};

// Admin có thể cập nhật sản phẩm
exports.capNhatSanPham = async (req, res) => {
    let updateProduct = await Product.findById(req.params.id)
    if (!updateProduct) {
        return res.status(500).json({
            success: false,
            message: "Khong tim thay san pham"
        })
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
}

// Admin có thể xóa sản phẩm
exports.xoaSanPham = async (req, res, next) =>{
    const deleteProduct = await Product.findById(req.params.id)
    if (!deleteProduct) {
        return res.status(500).json({
            success: false,
            message: 'Khong tim thay san pham'
        })
    }
    await deleteProduct.remove();
    res.status(200).json({
        success: true,
        message: 'San pham da duoc xoa'
    })
};


// xem xét 1 sản phẩm
exports.xemXetSanPham = async (req, res, next) =>{
    const getProduct = await Product.findById(req.params.id)
    if (!getProduct) {
        return res.status(500).json({
            success: false,
            message: 'Khong tim thay san pham'
        })
    }
    res.status(200).json({
        success: true,
        getProduct
    })
};
