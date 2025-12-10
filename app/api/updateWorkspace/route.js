import { connect } from "@/app/config/serverConfig.js";
import { updateWorkspaceService } from "@/app/services/workspaceService.js";
import { isAuthenticated } from "@/app/utils/common/authUtils.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects.js";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";


export async function PUT(request){
    try{
  await connect()
 const token=request.headers.get('x-access-token')

 const {searchParams}=new URL(request.url)

 const workspaceId=searchParams.get('workspaceId')
      
    const body=await request.json()

const authenticated=await isAuthenticated(token)

const {_id}=authenticated

const response=await updateWorkspaceService(workspaceId,body,_id)

return NextResponse.json(successResponse(response,`Successfully updated workspace`),{ status:StatusCodes.OK })
  
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