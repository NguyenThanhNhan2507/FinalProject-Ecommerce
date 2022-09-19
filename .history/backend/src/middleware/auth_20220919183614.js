const ErrorHandle = require('../untils/errorHandle.js');
const errorServer = require('../middleware/errorServer')
const jwt = require("jsonwebtoken")
const User = require('../models/UsersModel')

exports.xacThucNguoiDung = errorServer(async (req,res,next)=>{
    const {token} = req.cookies

    if (!token) {
        return next(new ErrorHandle("Vui lòng Đăng Kí",401))
    }

    const dataAccess = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(dataAccess.id)

    next()
})
