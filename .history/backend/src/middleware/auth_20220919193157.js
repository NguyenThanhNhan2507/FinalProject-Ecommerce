const ErrorHandle = require('../untils/errorHandle.js');
const errorServer = require('./errorServer')
const jwt = require("jsonwebtoken")
const User = require('../models/UsersModel')

exports.xacThucNguoiDung = errorServer(async (req,res,next) =>{
        const {token} = req.cookies;

        if (! token) {
            return next(new ErrorHandle("vui long dang nhap",401))
        }
        const dataAccess = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = await User.findById(dataAccess.id)

        next();
});
