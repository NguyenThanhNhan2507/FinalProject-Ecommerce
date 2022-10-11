const express = require('express');
const { datHang, oneDatHang, tatCaDonDatHang, adminTatCaDonHang } = require('../controllers/OrderContrl');
const { xacThucNguoiDung, xacThucAdmin } = require('../middleware/auth');

const router = express.Router();


router.route('/order/new').post(xacThucNguoiDung, datHang)
router.route('/order/:id').get(xacThucNguoiDung, oneDatHang)
router.route('/ordered/me').get(xacThucNguoiDung, tatCaDonDatHang)
router.route('/ordered/admin').get(xacThucNguoiDung,xacThucAdmin("admin"), adminTatCaDonHang)
module.exports = router 