const express = require('express');
const { getAllProduct, taoSanPham, xemSanPham, capNhatSanPham, xoaSanPham, xemXetSanPham, danhGiaSanPham, danhGiaOneSanPham, xoaDanhGia } = require('../controllers/ProductContrl');
const {  } = require('../middleware/auth');

const router = express.Router();


router.route('/products').get(xemSanPham)
router.route('/product/new').post(xacThucNguoiDung,xacThucAdmin("admin"),taoSanPham)
router.route('/product/:id').put(xacThucNguoiDung,xacThucAdmin("admin"),capNhatSanPham).delete(xacThucNguoiDung,xacThucAdmin("admin"),xoaSanPham).get(xemXetSanPham)

router.route('/product/review').post(xacThucNguoiDung,danhGiaSanPham)
router.route('/review').get(danhGiaOneSanPham).delete(xacThucNguoiDung,xacThucAdmin("admin"),xoaDanhGia)
module.exports = router