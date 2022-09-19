const ErrorHandle = require('../untils/errorHandle.js');
const errorServer = require('./errorServer')
const jwt = require("jsonwebtoken")
const User = require('../models/UsersModel')

exports.xacThucNguoiDung = errorServer(async (req,res,next) =>{
        const {tokens} = req.cookies;

        if (!tokens) {
            return next(new ErrorHandle("vui long dang nhap",401))
        }
        const dataAccess = jwt.verify(tokens, process.env.JWT_SECRET_KEY)

        req.user = await User.findById(dataAccess.id)

        next();
});
