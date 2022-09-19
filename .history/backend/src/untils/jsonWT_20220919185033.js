const giveToken = (user,statusCode,res) =>{

    const token = user.getJwtToken();


   const options = {
       expires: new Date(
           Date.now() + process.env.EXPIRE_COOKIE * 24 * 60 * 60 * 1000
       ),
       httpOne: true
   };

   res.status(statusCode).cookie("token",token,options).json({
       success: true,
       user,
       token
   });
}

module.exports = giveToken;