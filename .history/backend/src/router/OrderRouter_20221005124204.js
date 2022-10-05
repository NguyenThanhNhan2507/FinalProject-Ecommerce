const express = require('express');
const { datHang, oneDatHang } = require('../controllers/OrderContrl');
const { xacThucNguoiDung, xacThucAdmin } = require('../middleware/auth');

const router = express.Router();


router.route('/order/new').post(xacThucNguoiDung, datHang)

router.route('/order/:id').get(xacThucNguoiDung, oneDatHang)
module.exports = router