const mongoose = require("mongoose");

const connectDb = () =>{
    mongoose.connect(process.env.URL_DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)={
        console.log(`database đã được kết nối:$`)
    })
}