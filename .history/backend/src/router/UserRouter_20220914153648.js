const express = require('express');
const { taoNguoidung, nguoiDungDangNhap } = require('../controllers/UserContrl');

const router = express.Router();

router.route("/register").post(taoNguoidung)
router.route("/login").post(nguoiDungDangNhap)



module.exports = router