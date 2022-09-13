const express = require('express');
const { getAllProduct, taoSanPham, xemSanPham, capNhatSanPham } = require('../controllers/ProductContrl');

const router = express.Router();


router.route('/products').get(xemSanPham)
router.route('/product/new').post(taoSanPham)
router.route('/product/:id').put(capNhatSanPham)


module.exports = router