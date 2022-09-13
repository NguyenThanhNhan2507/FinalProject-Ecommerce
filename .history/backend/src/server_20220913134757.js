const app = require('./');
const dotenv = require('dotenv');


dotenv.config({
    path:"backend/src/config/.env"
})
const server = app.listen(process.env.PORT,()=>{
    console.log(`server dang chay tren localhost:${process.env.PORT}`)
})