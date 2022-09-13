const ErrorHandle = require('../untils/errorHandle')

module.exports = (err, req, res, next) =>{
    err.statusErr = err.statusErr || 500
    err.message = err.message || 'Loi may chu'
    
    res.status(err.statusErr).json({
        suscess: false,
        error: err.message
    })
}