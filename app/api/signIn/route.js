import { connect } from "@/app/config/serverConfig"
import { signInService } from "@/app/services/userService"
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects"
import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export async function POST(request){
    try{
          await connect()

          
          const body=await request.json()
          console.log(body,'see body at signup')
        //    const parsedData=await JSON.parse(body)
            // console.log(parsedData,'dekho parsed data ') 
           const response=await signInService(body)

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