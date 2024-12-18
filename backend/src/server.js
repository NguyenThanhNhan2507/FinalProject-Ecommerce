// const connectDatabase = require("./db/Database.js");
// const cloudinary = require("cloudinary");
// const path = require("path");
// const express = require("express");
// const app = express();  
// const ErrorHandler = require("./middleware/error");
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const bodyParser = require("body-parser");
// const PORT = process.env.PORT || 5000

// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(fileUpload({ useTempFiles: true }));
// require("dotenv").config({
//   path: "config/.env",
// });



// // Route imports
// const product = require("./routes/ProductRoute");
// const user = require("./routes/UserRoute");
// const order = require("./routes/OrderRoute");
// const payment = require("./routes/PaymentRoute");
// const cart = require("./routes/WishListRoute");

// app.use("/api/v2", product);

// app.use("/api/v2", user);

// app.use("/api/v2", order);

// app.use("/api/v2", payment);

// app.use("/api/v2", cart);

// // it's for errorHandeling
// app.use(ErrorHandler);

// // Handling uncaught Exception
// process.on("uncaughtException",(err) =>{
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server for Handling uncaught Exception`);
// })

// const buildDir = path.join(__dirname, "/public");

//     app.use("/", express.static(buildDir))
  
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(buildDir, "index.html"));
//     })

// // connect database
// connectDatabase();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

// // create server
// app.listen(PORT,() =>{
//     console.log(`Server is working on http://localhost:${PORT}`)
// })




const app = require("./app");
const connectDatabase = require("./db/Database.js");
const cloudinary = require("cloudinary");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for Handling uncaught Exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "src/config/.env",
  });
}
// connect database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server for ${err.message}`);
  console.log(`Shutting down the server due to Unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});


