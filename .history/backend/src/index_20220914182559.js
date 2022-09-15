const express = require('express');
const app = express();
const ErrorHandle = require('./middleware/error');

app.use(express.json())


// Nhập router
const product = require("./router/ProductRouter");
const user = require("./router/UserRouter");


//http
app.use("/api/v2", product)
app.use("/api/v2", user)



app.use(ErrorHandle)
module.exports = app