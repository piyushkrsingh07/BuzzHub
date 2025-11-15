import { connect } from "@/app/config/serverConfig"
import { addChannelToWorkspaceService } from "@/app/services/workspaceService"
import { isAuthenticated } from "@/app/utils/common/authUtils"
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects"
import { addChannelToWorkspaceSchema } from "@/app/validators/workspaceSchema"
import { validate } from "@/app/validators/zodValidator"

import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export async function PUT(request){
    try{
       
        await connect()

        const token=request.headers.get('x-access-token')

      

        const {searchParams}=new URL(request.url)

        const workspaceId=searchParams.get('workspaceId').trim()
        const channelName=searchParams.get('channeName')

          const authenticatedUser=await isAuthenticated(token)

          const {_id}=authenticatedUser

          const body={channelName}
           const validation= await validate(addChannelToWorkspaceSchema,body)

           console.log(validation,'check validation')
          const response=await addChannelToWorkspaceService(workspaceId,channelName,_id)

          console.log('dekho channel create hua y nhi',response)

        return NextResponse.json(successResponse(response,`Successfully updated workspace channels`),{ status:StatusCodes.OK })
    }catch(error){
        if(error.statusCode){
                                         return NextResponse.json(
                                            {
                                                 message:customErrorResponse(error)
                                             },
                                             {
                                                 status:error.statusCode
                                             }
                                         )
                                     }
                                     return NextResponse.json(
                                           {message:internalErrorResponse(error)},
                                          { status:StatusCodes.INTERNAL_SERVER_ERROR }
                                       
                                     )
    }
}