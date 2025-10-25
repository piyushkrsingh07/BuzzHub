const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
    constructor(errorDetails,message){
        super(message);  //calls parent class
        this.name='ValidationError'
        let explaination=[]
        Object.keys(errorDetails).forEach((key)=>{
            explaination.push(errorDetails.error[key])
        })
        this.explaination=explaination
        this.message=message
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}