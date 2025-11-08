import userRepository from '@/app/repositories/userRepository'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { internalErrorResponse } from './responseObjects'

export const isAuthenticated=async(token)=>{

    try{
     if(!token){
        return NextResponse.json(
             {
                    status:StatusCodes.FORBIDDEN
                 },{
                message:customErrorResponse({
                    explanation:'Invalid data sent from the client',
                    message:'No auth token provided'
                })
                             }
                         )
     }

     const response=await jwt.verify(token,process.env.JWT_SECRET)

     if(!response){
         return NextResponse.json(
             {
                    status:StatusCodes.FORBIDDEN
                 },{
                message:customErrorResponse({
                    explanation:'Invalid data sent from the client',
                    message:'No auth token provided'
                })
                             }
                         )
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
                    status:StatusCodes.FORBIDDEN
                 },{
                message:customErrorResponse({
                    explanation:'Invalid data sent from the client',
                    message:'No auth token provided'
                })
                             }
                         )

                                  
        }

            return NextResponse.json(
      { status:StatusCodes.INTERNAL_SERVER_ERROR },
 {message:internalErrorResponse(error)}
          )
    }

}
export const createJWT=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}