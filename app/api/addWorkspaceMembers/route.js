import { connect } from "@/app/config/serverConfig.js";
import { addMemberToWorkspaceService } from "@/app/services/workspaceService.js";
import { isAuthenticated } from "@/app/utils/common/authUtils.js";
import workspaceJoinMail from "@/app/utils/common/mailObject.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects.js";
import { addMemberToWorkspaceSchema } from "@/app/validators/workspaceSchema.js";
import { validate } from "@/app/validators/zodValidator.js";
import { triggerQStash } from "@/queues/mailQueque.js";
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

console.log(response,'checking out the response')
const triggerData={
  
...workspaceJoinMail(response),
  to:response.mail

}
const mailResponse=await triggerQStash(triggerData)
console.log(mailResponse,'mailing bdcoe')

return NextResponse.json(successResponse(response,`Successfully Updated members to workspace and mail has been sent`),{ status:StatusCodes.OK })

   }catch(error){
    console.log(error,'see error at mainz')
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