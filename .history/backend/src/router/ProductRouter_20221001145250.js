const express = require('express');
const { getAllProduct, taoSanPham, xemSanPham, capNhatSanPham, xoaSanPham, xemXetSanPham } = require('../controllers/ProductContrl');
const { xacThucNguoiDung, xacThucAdmin } = require('../middleware/auth');

const router = express.Router();


router.route('/products').get(xemSanPham)
router.route('/product/new').post(xacThucNguoiDung,xacThucAdmin("admin"),taoSanPham)
router.route('/product/:id').put(xacThucNguoiDung,xacThucAdmin("admin"),capNhatSanPham).delete(xacThucNguoiDung,xacThucAdmin("admin"),xoaSanPham).get(xemXetSanPham)



module.exports = router