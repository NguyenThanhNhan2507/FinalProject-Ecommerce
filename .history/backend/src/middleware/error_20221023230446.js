const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) =>{
    err.statusErr = err.statusErr || 500
    err.message = err.message || 'Loi may chu'


    if(err.name === "CastError"){
        const message = `Không tìm thấy tài nguyên với id không hợp lệ ${err.path}`
        err = new ErrorHandler(message,400)
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
      }

    if (err.name === "JsonWebTokenError") {
        const message = `Your url is invalid please try again`;
        err = new ErrorHandler(message, 400);
        }

    if (err.name === "TokenExpiredError") {
            const message = `Your url is expired please try again`;
            err = new ErrorHandler(message, 400);
            }
    res.status(err.statusErr).json({
        suscess: false,
        message: err.message
    })
}