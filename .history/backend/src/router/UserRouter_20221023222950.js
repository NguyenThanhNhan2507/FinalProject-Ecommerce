const express = require('express');
const { taoNguoidung, nguoiDungDangNhap, nguoiDungDangXuat, quenPassword, layLaiMatKhau, thongTinNguoiDung, capNhatMatKhau, capNhatThongTin, tatCaNguoiDung, motNguoiDung, thayDoiQuyenNguoiDung, xoaNguoiDung } = require('../controllers/UserContrl');
const { xacThucNguoiDung, xacThucAdmin } = require('../middleware/auth');

const router = express.Router();

router.route("/registration").post(taoNguoidung)
router.route("/login").post(nguoiDungDangNhap)

router.route("/logout").get(nguoiDungDangXuat)
router.route("/password/forgot").post(quenPassword)
router.route("/password/reset/:token").put(layLaiMatKhau)
router.route("/me").get(xacThucNguoiDung, thongTinNguoiDung)
router.route("/me/update").put(xacThucNguoiDung, capNhatMatKhau)
router.route("/me/update/inf").put(xacThucNguoiDung, capNhatThongTin)
router.route("/admin/user").get(xacThucNguoiDung,xacThucAdmin("admin"), tatCaNguoiDung)
router.route("/admin/users/:id").get(xacThucNguoiDung,xacThucAdmin("admin"), motNguoiDung).put(xacThucNguoiDung,xacThucAdmin("admin"), thayDoiQuyenNguoiDung).delete(xacThucNguoiDung,xacThucAdmin("admin"), xoaNguoiDung)

module.exports = router