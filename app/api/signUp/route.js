import { connect } from "@/app/config/serverConfig.js"
import { signUpService } from "@/app/services/userService.js"
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects.js"
import { userSignUpSchema } from "@/app/validators/userSchema.js"
import { validate } from "@/app/validators/zodValidator.js"
import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export async function POST(request){
   try{
    await connect()
    const body=await request.json()
    const parsedData = await validate(userSignUpSchema, body);
    console.log(body,'see body')
       const user=await signUpService(body)
       console.log(user,'dekho user')
       return NextResponse.json({message:successResponse(user,'User created successfully')},{ status:StatusCodes.OK })
   }catch(error){
    console.log('User controller error',error)
    if(error.statusCode){
        return NextResponse.json(
            {
                message:customErrorResponse(error)
            },
            {
                status:error.statusCode
            },
        )
    }
    return NextResponse.json(
         {message:internalErrorResponse(error)},
         { status:StatusCodes.INTERNAL_SERVER_ERROR },
        
    )
   }
}