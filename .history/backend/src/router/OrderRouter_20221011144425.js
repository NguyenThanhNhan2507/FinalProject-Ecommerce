const express = require('express');
const { datHang, oneDatHang, tatCaDonDatHang, adminTatCaDonHang, adminCapNhatDatHang, xoaDonDatHang } = require('../controllers/OrderContrl');
const { xacThucNguoiDung, xacThucAdmin } = require('../middleware/auth');

const router = express.Router();


router.route('/order/new').post(xacThucNguoiDung, datHang)
router.route('/quantri/:id').get(xacThucNguoiDung, oneDatHang).delete(xacThucNguoiDung,xacThucAdmin("admin"), xoaDonDatHang)
// router.route('/orders/:id').get(xacThucNguoiDung, oneDatHang).delete(xacThucNguoiDung,xacThucAdmin("admin"), xoaDonDatHang)
router.route('/ordered/me').get(xacThucNguoiDung, tatCaDonDatHang)
router.route('/admin/ordered').get(xacThucNguoiDung,xacThucAdmin("admin"), adminTatCaDonHang)
// router.route('/quantri/dathang/:id').get(xacThucNguoiDung, oneDatHang).delete(xacThucNguoiDung,xacThucAdmin("admin"), xoaDonDatHang)


module.exports = router 