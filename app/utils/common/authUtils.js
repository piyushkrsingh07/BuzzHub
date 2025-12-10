import userRepository from '@/app/repositories/userRepository.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { customErrorResponse, internalErrorResponse } from './responseObjects.js'

export const isAuthenticated=async(token)=>{

    try{
     if(!token){
        console.log("yha aa ya ki nhi aaya")
        return NextResponse.json(
            {
                message:customErrorResponse({
                    explanation:'Invalid data sent from the client',
                    message:'No auth token provided'
                })
                             },
             {
                    status:StatusCodes.FORBIDDEN
                 }
                         )
     }
console.log("checked if reached here")
     const response=await jwt.verify(token,process.env.JWT_SECRET)

        if (!response) {
      return NextResponse.json(
        {
          message: customErrorResponse({
            explanation: "Invalid data sent from the client",
            message: "No auth token provided",
          }),
        },
        {
          status: StatusCodes.FORBIDDEN,
        }
      );
    }

     console.log(response,'dekho response at middleware')
     const user=await userRepository.getById(response.id)
          console.log(user,'see user at middle')
     return user

    }catch(error){
        console.log('Auth middleware error',error)
        if(error.name === 'JsonWebTokenError'){
            return NextResponse.json(
        {
          message: customErrorResponse({
            explanation: "Invalid data sent from the client",
            message: "No auth token provided",
          }),
        },
        {
          status: StatusCodes.FORBIDDEN,
        }
      );

                                  
        }

            return NextResponse.json(
    
       {
        message: internalErrorResponse(error),
      },
      { status:StatusCodes.INTERNAL_SERVER_ERROR }

          )
    }

}
export const createJWT=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}