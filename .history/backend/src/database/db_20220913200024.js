const mongoose = require("mongoose");

const connectDb = () =>{
    mongoose.connect(process.env.URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) =>{
        console.log(`mongodb is connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDb