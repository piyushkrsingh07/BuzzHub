import { StatusCodes } from "http-status-codes"
import { customErrorResponse } from "../utils/common/responseObjects"
import { NextResponse } from "next/server"

export const validate=async(schema,data)=>{

    try{
   return  await schema.parseAsync(data)
     
    }catch(error){
        console.log('Validation error in zod validator',error.errors)
        throw {
      name: "ZodError",
      statusCode: StatusCodes.BAD_REQUEST,

      response: customErrorResponse({
        message: "Validation Error",
        explanation: error.errors.map(e => e.message).join(", "),
      }), 
    };
  
    }
   }
