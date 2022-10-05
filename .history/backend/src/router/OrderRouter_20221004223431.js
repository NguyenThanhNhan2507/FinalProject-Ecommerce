const express = require('express');
const { xacThucNguoiDung, xacThucAdmin } = require('../middleware/auth');

const router = express.Router();

module.exports = router