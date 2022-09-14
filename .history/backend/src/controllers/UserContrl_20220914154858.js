const User = require('../models/UsersModel.js')
const ErrorHandle = require('../untils/errorHandle.js');
const errorServer = require('../middleware/errorServer')


exports.taoNguoidung = errorServer(async (req, res,next)=>{
    const{name,email,password}= req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "nhandeptrai.com",
            url: "nhandeptrai.com"
        }
    })
    const token = user.getJwtToken()


    res.status(201).json({
        sucess: true,
        token
    })
})

exports.nguoiDungDangNhap = errorServer(async (req,res,next) =>{
    const{email,password} = req.body
    if (!email || !password)  {
        return next(new ErrorHandle("Vui long nhap email va password",400))
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandle("Khong tim thay nguoi dung",401))
    }

    const passwordCompleted =  await user.comparePassword(password);
    if (!passwordCompleted) {
        return next(new ErrorHandle("Vui long nhap email va password",401))
    }

    const token = user.getJwtToken()
    res.status(201).json({
        sucess: true,
        token
    })
})