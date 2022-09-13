const mongoose = require("mongoose");

const connectDb = () =>{
    mongoose.connect(process.env.URL)
}