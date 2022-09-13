
class ErrorHandle extends Error{
    constructor(message,statusErr){
        super(message);
        this.statusErr = statusErr

        Error.captureStackTrace(this,this.constructor);

    }
    
}
module.exports = ErrorHandle