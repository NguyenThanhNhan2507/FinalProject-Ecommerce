const app = require('./index');
const dotenv = require('dotenv');
const connectDb = require('./database/db')

dotenv.config({
    path:"src/config/.env"
})

connectDb()

const server = app.listen(process.env.PORT,()=>{
    console.log(`server dang chay tren localhost:${process.env.PORT}`)
})