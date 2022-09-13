const express = require('express');
const app = express();
const ErrorHandle = require('./untils/errorHandle');

app.use(express.json())


// Nhập router
const product = require("./router/ProductRouter");

app.use("/api/v2", product)
app.use(ErrorHandle)
module.exports = app