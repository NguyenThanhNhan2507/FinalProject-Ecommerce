const ErrorHandle = require('../untils/errorHandle')

module.exports = (err, req, res, next) =>{
    err.statusCode = err.message || 500
    err.message = err.message || 'Loi may chu'
    res.status(err.statusCode).json({
        suscess: false,
        error: err
    })
}