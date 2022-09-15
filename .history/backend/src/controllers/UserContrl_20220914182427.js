const User = require('../models/UsersModel.js')
const ErrorHandle = require('../untils/errorHandle.js');
const errorServer = require('../middleware/errorServer')
const giveToken = require('../untils/jsonWT.js')


// đăng kí
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
    giveToken(user,201,res)
})

// đăng nhập
exports.nguoiDungDangNhap = errorServer(async (req, res, next) => {
        const { email, password } = req.body;
      
        if (!email || !password) {
          return next(new ErrorHandle("Vui long nhap email va password", 400));
        }
      
        const user = await User.findOne({ email }).select("+password");
      
        if (!user) {
          return next(
            new ErrorHandle("Nguoi dung khong hop le", 401)
          );
        }
        const passwordCompleted = await user.comparePassword(password);
      
        if (!passwordCompleted) {
          return next(
            new ErrorHandle("Nguoi dung khong hop le", 401));
        }
        giveToken(user,201,res)
})

// đăng xuất
// exports.nguoiDungDangXuat = errorServer( async, (req, res, next)=>{
//       res.cookie("token", null, {
//         expires: new Date(Date.now()),
//         httpOnly: true
//       })
//       res.status(200).json({
//         sucess: true,
//         message: "dang xuat thanh cong"
//       })
// })