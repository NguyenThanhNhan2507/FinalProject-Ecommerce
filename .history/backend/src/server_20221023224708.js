const app = require('./index');
const dotenv = require('dotenv');
const connectDb = require('./database/db.js')

// Handling uncaught Exception
process.on("Không thể xử lý",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Tắt máy chủ do từ chối lời hứa chưa được xử lý`);
})

// config
dotenv.config({
    path:"src/config/.env"
})

// connect database
connectDb()


// create server
const server = app.listen(process.env.PORT,()=>{
    console.log(`server dang chay tren localhost:${process.env.PORT}`)
})

// Unhandled promise rejection
process.on("Khong the xu ly", (err) =>{
    console.log(`Đang tắt máy chủ for ${err.message}`);
    console.log(`Tắt máy chủ do từ chối lời hứa chưa được xử lý`);
    server.close(() =>{
        process.exit(1);
    });
});