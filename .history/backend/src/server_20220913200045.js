const app = require('./index');
const dotenv = require('dotenv');
con

dotenv.config({
    path:"src/config/.env"
})
const server = app.listen(process.env.PORT,()=>{
    console.log(`server dang chay tren localhost:${process.env.PORT}`)
})