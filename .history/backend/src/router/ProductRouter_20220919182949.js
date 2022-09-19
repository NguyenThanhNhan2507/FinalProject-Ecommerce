const express = require('express');
const { getAllProduct, taoSanPham, xemSanPham, capNhatSanPham, xoaSanPham, xemXetSanPham } = require('../controllers/ProductContrl');
const { xacThucNguoiDung } = require('../middleware/auth');

const router = express.Router();


router.route('/products').get(xemSanPham)
router.route('/product/new').post(xacThucNguoiDung,taoSanPham)
router.route('/product/:id').put(capNhatSanPham).delete(xoaSanPham).get(xemXetSanPham)



module.exports = router