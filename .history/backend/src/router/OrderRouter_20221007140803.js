const express = require('express');
const { datHang, oneDatHang, tatCaDonDatHang, adminTatCaDonHang, adminCapNhatDatHang, xoaDonDatHang } = require('../controllers/OrderContrl');
const { xacThucNguoiDung, xacThucAdmin } = require('../middleware/auth');

const router = express.Router();


router.route('/order/new').post(xacThucNguoiDung, datHang)
router.route('/order/:id').get(xacThucNguoiDung, oneDatHang)
router.route('/ordered/me').get(xacThucNguoiDung, tatCaDonDatHang)
router.route('/admin/ordered').get(xacThucNguoiDung,xacThucAdmin("admin"), adminTatCaDonHang)
router.route('/admin/orders/:id').put(xacThucNguoiDung,xacThucAdmin("admin"), adminCapNhatDatHang).delete(xacThucNguoiDung, xacThucAdmin("admin"), xoaDonDatHang)
module.exports = router 