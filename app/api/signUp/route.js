import { connect } from "@/app/config/serverConfig"
import { signUpService } from "@/app/services/userService"
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects"
import { userSignUpSchema } from "@/app/validators/userSchema"
import { validate } from "@/app/validators/zodValidator"
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
                status:error.statusCode
            },{
                message:customErrorResponse(error)
            }
        )
    }
    return NextResponse.json(
         { status:StatusCodes.INTERNAL_SERVER_ERROR },
         {message:internalErrorResponse(error)}
    )
   }
}