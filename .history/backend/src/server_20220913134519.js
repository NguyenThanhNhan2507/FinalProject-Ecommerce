const express = require('express');
const dotenv = require('dotenv');


dotenv.config()
const server = app.listen(process.env.PORT,()=>{
    console.log(`server dang chay tren localhost:${process.env.PORT}`)
})