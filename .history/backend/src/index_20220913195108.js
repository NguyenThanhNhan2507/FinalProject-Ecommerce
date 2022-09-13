const express = require('express');
const app = express();


app.use(express.json())


// Nhập router
const product = require("./router/ProductRouter")
app.use("", product)

module.exports = app