const express = require('express');
const { getAllProduct, taoSanPham, xemSanPham, capNhatSanPham, xoaSanPham } = require('../controllers/ProductContrl');

const router = express.Router();


router.route('/products').get(xemSanPham)
router.route('/product/new').post(taoSanPham)
router.route('/product/:id').put(capNhatSanPham).delete(xoaSanPham)



module.exports = router