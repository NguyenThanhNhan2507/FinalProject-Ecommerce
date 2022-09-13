const ErrorHandle = require('../untils/errorHandle')

module.exports = (err, req, res, next) =>{
    err.statusErr = err.statusErr || 500
    err.message = err.message || 'Loi may chu'
    
    if (err.name === 'servererror') {
        const message = `Khong tim thay may chu voi id khong hop le ${err.path}`;
        err = new ErrorHandle(message, 400);
    }

    res.status(err.statusErr).json({
        suscess: false,
        message: err.message
    })
}