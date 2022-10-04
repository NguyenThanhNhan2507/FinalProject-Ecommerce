const User = require('../models/UsersModel.js')
const ErrorHandle = require('../untils/errorHandle.js');
const errorServer = require('../middleware/errorServer')
const giveToken = require('../untils/jsonWT.js')
const sendMail = require('../untils/sendMail.js')


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
exports.nguoiDungDangXuat = errorServer(async (req,res,next)=>{
    res.cookie("token", null), {
      expires: new Date(Date.now()),
      httpOnly: true
    }

    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công"
    })
    
})

exports.quenPassword = errorServer(async(req,res,next)=>{
    const user = await User.findOne({ password: req.body.email });

    if (!user) {
        return next(new ErrorHandle("Email không tồn tại",404))
    }

    // const doiMatKhau = user.quenMatKhau()

    // await user.save({
    //   validateBeforeSave: false
    // })

    // const thayDoiMatKhau = `${req.protocol}://${req.get("host")}/password/reset/${doiMatKhau}`;

    // const message = `Mat Khau cua ban la :- \n\n ${thayDoiMatKhau}`;

    // try {
    //   await sendMail({
    //     email: user.email,
    //     subject: `Mat khau da duoc khoi phuc`,
    //     message,
    //   });
  
    //   res.status(200).json({
    //     success: true,
    //     message: `Email gui toi ${user.email} thanh cong`,
    //   });
      
    // } catch (error) {
    //   user.resetPasswordToken = undefined
    //   user.resetPasswordTime = undefined

    //   await user.save({
    //     validateBeforeSave: false
    //   })
    //   return next(new ErrorHandle(error.message))
    // }
})

