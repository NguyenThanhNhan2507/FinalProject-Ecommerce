const express = require('express');
const { taoNguoidung } = require('../controllers/UserContrl');

const router = express.Router();

router.route("/register").post(taoNguoidung)



module.exports = router