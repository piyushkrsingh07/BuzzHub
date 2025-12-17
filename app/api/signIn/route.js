// import { mailResponse } from "@/app/config/mailConfig"
import { connect } from "@/app/config/serverConfig.js"
import { signInService } from "@/app/services/userService.js"
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects.js"
import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request){
    try{
          await connect()

          
          const body=await request.json()
          console.log(body,'see body at signup')
        //    const parsedData=await JSON.parse(body)
            // console.log(parsedData,'dekho parsed data ') 
           const response=await signInService(body)
            const {token}=response  
         cookies().set("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
        //    const sendMail=await mailResponse()
        //    console.log(sendMail,'dekho mail sent or not')
        //    console.log(typeof sendMail,'see type of send mail')

                  console.log(response,'dekho userlogged in')
                  return NextResponse.json(successResponse(response,'User logged in successfully'),{ status:StatusCodes.OK })


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