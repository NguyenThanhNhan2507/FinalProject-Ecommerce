const express = require('express');
const { taoNguoidung, nguoiDungDangNhap, nguoiDungDangXuat, quenPassword, layLaiMatKhau, thongTinNguoiDung, capNhatMatKhau, capNhatThongTin, tatCaNguoiDung, motNguoiDung } = require('../controllers/UserContrl');
const { xacThucNguoiDung } = require('../middleware/auth');

const router = express.Router();

router.route("/register").post(taoNguoidung)
router.route("/login").post(nguoiDungDangNhap)

router.route("/logout").get(nguoiDungDangXuat)
router.route("/password/forgot").post(quenPassword)
router.route("/password/reset/:token").put(layLaiMatKhau)
router.route("/me").get(xacThucNguoiDung, thongTinNguoiDung)
router.route("/me/update").put(xacThucNguoiDung, capNhatMatKhau)
router.route("/me/update/inf").put(xacThucNguoiDung, capNhatThongTin)
router.route("/admin/user").put(xacThucNguoiDung,xacThucAdmin("admin"), tatCaNguoiDung)
router.route("/admin/user/id:").put(xacThucNguoiDung,xacThucAdmin("admin"), motNguoiDung)
module.exports = router