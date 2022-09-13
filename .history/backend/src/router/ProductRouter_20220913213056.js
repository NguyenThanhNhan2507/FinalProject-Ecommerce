const express = require('express');
const { getAllProduct, taoSanPham, xemSanPham } = require('../controllers/ProductContrl');

const router = express.Router();


router.route('/products').get(xemSanPham)
router.route('/product/new').post(taoSanPham)


module.exports = router