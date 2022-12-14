const User = require('../models/UsersModel.js')
const ErrorHandle = require('../untils/errorHandle.js');
const errorServer = require('../middleware/errorServer')
const giveToken = require('../untils/jsonWT.js')
const sendMail = require('../untils/sendMail.js')
const crypto = require('crypto');


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
// quên mật khẩu
exports.quenPassword = errorServer(async(req,res,next)=>{
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandle("Email không tồn tại",404))
    }

    const doiMatKhau = user.quenMatKhau()

    await user.save({
      validateBeforeSave: false
    })

    const thayDoiMatKhau = `${req.protocol}://${req.get("host")}/password/reset/${doiMatKhau}`;

    const message = `Mat Khau cua ban la :- \n\n ${thayDoiMatKhau}`;

    try {
      await sendMail({
        email: user.email,
        subject: `Mat khau da duoc khoi phuc`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email gui toi ${user.email} thanh cong`,
      });
      
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordTime = undefined

      await user.save({
        validateBeforeSave: false
      })
      return next(new ErrorHandle(error.message, 500))
    }
})
// lấy lại mật khẩu
exports.layLaiMatKhau = errorServer(async(req,res,next)=>{
  const resetPasswordToken  = crypto.createHash("sha256")
  .update(req.params.token)
  .digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: {$gt: Date.now()}
  })
  if (!user) {
    return next(new ErrorHandle("Lấy lại mật khẩu thất bại do mật khẩu đã tồn tại hoặc giá trị sai",400))
  }
  if (req.body.password !== req.body.comfirmpassword) {
    return next(new ErrorHandle("Mật khẩu không khớp với mật khẩu mới",400))
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordTime = undefined

  await user.save()
  giveToken(user,200,res)
})

// thay đổi mật khẩu
exports.capNhatMatKhau = errorServer(async(req,res,next)=>{
  const user = await User.findById(req.user.id).select("+password");
  const passwordCompleted = await user.comparePassword(req.body.oldPassword);
      
  if (!passwordCompleted) {
    return next(
      new ErrorHandle("Mật khẩu cũ không đúng", 400));
  }
  if(req.body.newPassword !== req.body.comfirmpassword){
    return next(new ErrorHandle("Mật khẩu không trùng khớp",400))
  }
  user.password = req.body.newPassword

  await user.save()
  giveToken(user,200,res)
})

//Thông tin của người dùng
exports.thongTinNguoiDung = errorServer(async(req,res,next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
      sucess: true,
      user,
    })
})

// Cập nhật thông tin người dùng

exports.capNhatThongTin = errorServer(async(req,res,next)=>{
  const thongTinMoi ={
    name: req.body.name,
    email: req.body.email,

  }
  const user = await User.findByIdAndUpdate(req.user.id,thongTinMoi,{
    new: true,
    runValidators: true,
    userFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })

})

// admin xem tất cả người dùng 
exports.tatCaNguoiDung = errorServer(async (req,res,next) =>{
  const users = await User.find();

  res.status(200).json({
      success: true,
      users,
  });
});

// Admin xem thông tin từng người dùng
exports.motNguoiDung = errorServer(async (req,res,next) =>{
  const user = await User.findById(req.params.id);
 
  if(!user){
      return next(new ErrorHandle("Không thể tìm thấy người dùng với id này",400));
  }

  res.status(200).json({
      success: true,
      user,
  });
});

// admin thay đổi quyền người dùng
exports.thayDoiQuyenNguoiDung = errorServer(async(req,res,next) =>{
  const thongTinMoi = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id,thongTinMoi, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
  });

  res.status(200).json({
      success: true,
      user
  })
});

// admin xóa người dùng
exports.xoaNguoiDung = errorServer(async(req,res,next) =>{
  
  const user = await User.findById(req.params.id);

   if(!user){
       return next(new ErrorHandle("Không tìm thấy người dùng với id này",400));
   }

   await user.remove();

   res.status(200).json({
       success: true,
       message:"Xóa người dùng thành công"
   })
});