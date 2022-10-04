const ErrorHandle = require('../untils/errorHandle')

module.exports = (err, req, res, next) =>{
    err.statusErr = err.statusErr || 500
    err.message = err.message || 'Loi may chu'


    if(err.name === "CastError"){
        const message = `Không tìm thấy tài nguyên với id không hợp lệ ${err.path}`
        err = new ErrorHandle(message,400)
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandle(message, 400);
      }
    res.status(err.statusErr).json({
        suscess: false,
        message: err.message
    })
}