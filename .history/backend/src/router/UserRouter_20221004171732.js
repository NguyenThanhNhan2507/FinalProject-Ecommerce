const express = require('express');
const { taoNguoidung, nguoiDungDangNhap, nguoiDungDangXuat, quenPassword, layLaiMatKhau, thongTinNguoiDung } = require('../controllers/UserContrl');
const { xacThucNguoiDung } = require('../middleware/auth');

const router = express.Router();

router.route("/register").post(taoNguoidung)
router.route("/login").post(nguoiDungDangNhap)

router.route("/logout").get(nguoiDungDangXuat)
router.route("/password/forgot").post(quenPassword)
router.route("/password/reset/:token").put(layLaiMatKhau)
router.route("/me").get(xacThucNguoiDung, thongTinNguoiDung)

module.exports = router