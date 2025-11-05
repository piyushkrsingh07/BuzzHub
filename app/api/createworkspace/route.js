import { connect } from "@/app/config/serverConfig"
import { createWorkSpaceService } from "@/app/services/workspaceService"
import { isAuthenticated } from "@/app/utils/common/authUtils"
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects"
import { createWorkSpaceSchema } from "@/app/validators/workspaceSchema"
import { validate } from "@/app/validators/zodValidator"
import { NextResponse } from "next/server"

export async function POST(request){
    try{
          await connect()

          
          const body=await request.json()
          console.log(body,'see body at signup')

          await validate(createWorkSpaceSchema,body)
        //    const parsedData=await JSON.parse(body)
            // console.log(parsedData,'dekho parsed data ') 

        const isUserAuthenticated=isAuthenticated(request)
           const response=await createWorkSpaceService({
            body,
            owner:isUserAuthenticated
           })

 

                  console.log(response,'dekho userlogged in')
                  return NextResponse.json(successResponse(response,'WorkSpace created successfully'),{ status:StatusCodes.OK })


    }catch(error){
             console.log(error)
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