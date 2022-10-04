const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userdb = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please your Name"],
    minlength: [3, "Please enter a name atleast 3 characters"],
    maxlength: [15, "Name can not big than 15 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minlength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

userdb.pre("save", async function(next){
    if (!this.isModified("password")) {
    next();
  }
    this.password = await bcrypt.hash(this.password,10)
})

userdb.methods.getJwtToken = function () {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

userdb.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

userdb.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

  return resetToken;
};


module.exports = mongoose.model("User", userdb);