import { connect } from "@/app/config/serverConfig"
import { deleteWorkSpaceService } from "@/app/services/workspaceService"
import { isAuthenticated } from "@/app/utils/common/authUtils"
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects"
import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export async function DELETE(request) {
    try{
       await connect()
const {searchParams}=new URL(request.url)

        const id=searchParams.get("id") 
          const token=request.headers.get('x-access-token')
const user=await isAuthenticated(token)

        const response=await deleteWorkSpaceService(id,user._id)
           
return NextResponse.json(successResponse(response,'WorkSpace deleted successfully'),{ status:StatusCodes.OK })

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
   

