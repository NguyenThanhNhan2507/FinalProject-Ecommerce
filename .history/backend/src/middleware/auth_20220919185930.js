const ErrorHandle = require('../untils/errorHandle.js');
const errorServer = require('./errorServer')
const jwt = require("jsonwebtoken")
const User = require('../models/UsersModel')

exports.xacThucNguoiDung = errorServer(async (req,res,next) =>{
        const {token} = req.cookies;

        if (!token) {
            return next(next ErrorHandle("vui long dang nhap",))
        }
});
