const express = require('express');
const { getAllProduct } = require('../controllers/ProductContrl');

const router = express.Router();


router.route('/products').get(getAllProduct)