const User = require('../models/UsersModel')
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
    res.status(201).json({
        sucess: true,
        user
    })
})