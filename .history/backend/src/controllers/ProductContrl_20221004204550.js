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

// Đánh giá sản phẩm
exports.danhGiaSanPham = errorServer(async (req, res, next) => {
    const { rating, comment, idOfProduct } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(idOfProduct);
  
    const danhGia = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (danhGia) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Xem tất cả đánh giá của 1 sản phẩm
  exports.danhGiaOneSanPham = errorServer(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandle("Không tìm thấy sản phẩm với id này", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });

  // admin xóa đánh giá 
exports.xoaDanhGia = errorServer(async (req, res, next) => {
    const product = await Product.findById(req.query.idOfProduct);
  
    if (!product) {
      return next(new ErrorHandle("Không tìm thấy sản phẩm với id này", 404));
    }
  
    const danhGia = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (danhGia.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const soLuongDanhGia = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.idOfProduct,
      {
        reviews,
        ratings,
        soLuongDanhGia,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });