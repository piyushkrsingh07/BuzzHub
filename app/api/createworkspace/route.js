import { connect } from "@/app/config/serverConfig.js"
import { createWorkSpaceService } from "@/app/services/workspaceService.js"
import { isAuthenticated } from "@/app/utils/common/authUtils.js"
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects.js"
import { createWorkSpaceSchema } from "@/app/validators/workspaceSchema.js"
import { validate } from "@/app/validators/zodValidator.js"
import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export async function POST(request){
    try{
          await connect()

          console.log(request,'finally request dekho')

          console.log(request.headers.get('x-access-token'), 'see final token')

          const token=request.headers.get('x-access-token')
          const body=await request.json()
  
          console.log(body,'see body at workspace creation')

          await validate(createWorkSpaceSchema,body)
        //    const parsedData=await JSON.parse(body)
            // console.log(parsedData,'dekho parsed data ') 

        const isUserAuthenticated=await isAuthenticated(token)

        console.log(isUserAuthenticated,'see authenticvated')

        const requiredData={...body,owner:isUserAuthenticated}
           const response=await createWorkSpaceService(
            requiredData
           )

 

                  console.log(response,'dekho created workspace')
                  return NextResponse.json(successResponse(response,'WorkSpace created successfully'),{ status:StatusCodes.OK })


    }catch(error){
             console.log(error,'yha dekho catch hua ki nhi')
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