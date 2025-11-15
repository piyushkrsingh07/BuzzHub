import { connect } from "@/app/config/serverConfig";
import { addMemberToWorkspaceService } from "@/app/services/workspaceService";
import { isAuthenticated } from "@/app/utils/common/authUtils";
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects";
import { addMemberToWorkspaceSchema } from "@/app/validators/workspaceSchema";
import { validate } from "@/app/validators/zodValidator";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";


export async function PUT(request){
   try{
     await connect()
 const token=request.headers.get('x-access-token')

 const {searchParams}=new URL(request.url)
 const workspaceId=searchParams.get('workspaceId')
 const role=searchParams.get('role')
 const memberId=searchParams.get('memberId') || 'members'
 
const {_id}= await isAuthenticated(token)

 await validate(addMemberToWorkspaceSchema,{memberId})
const response=await addMemberToWorkspaceService(workspaceId,memberId,role,_id)

return NextResponse.json(successResponse(response,`Successfully Updated members to workspace`),{ status:StatusCodes.OK })

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