class ErrorHandler extends Error {
    statusCode;
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this,this.constructor)
    }
}
export{ErrorHandler}