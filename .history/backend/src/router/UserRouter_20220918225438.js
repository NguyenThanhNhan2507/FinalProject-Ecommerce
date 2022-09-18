const express = require('express');
const { taoNguoidung, nguoiDungDangNhap, nguoiDungDangXuat } = require('../controllers/UserContrl');

const router = express.Router();

router.route("/register").post(taoNguoidung)
router.route("/login").post(nguoiDungDangNhap)

router.route("/logout").get(nguoiDungDangXuat)

module.exports = router