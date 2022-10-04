const express = require('express');
const { taoNguoidung, nguoiDungDangNhap, nguoiDungDangXuat, quenPassword } = require('../controllers/UserContrl');

const router = express.Router();

router.route("/register").post(taoNguoidung)
router.route("/login").post(nguoiDungDangNhap)

router.route("/logout").get(nguoiDungDangXuat)
router.route("/password/forgot").post(quenPassword)

module.exports = router