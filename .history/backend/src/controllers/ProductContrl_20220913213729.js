const Product = require('../models/ProductDbModel.js');



exports.taoSanPham = async (req, res, next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

};



exports.xemSanPham = async (req, res)=>{
  const products = await Product.find()
  res.status(200).json({
    success: true,
    products
  })
};

exports.capNhatSanPham = async (req, res) => {
    const updateProduct = await Product.findById(req.params.id)
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
