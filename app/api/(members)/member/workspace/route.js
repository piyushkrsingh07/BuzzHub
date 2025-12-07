import { connect } from "@/app/config/serverConfig"
import { isMemberPartOfWorkspace } from "@/app/services/memberService"
import { isAuthenticated } from "@/app/utils/common/authUtils"
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects"
import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export async function GET(request){
   try{
           await connect()
          const token=request.headers.get('x-access-token')

                  await isAuthenticated(token)

        
           const {searchParams}=new URL(request.url)
        const workspaceId=searchParams.get('workspaceId')



    const memberId=searchParams.get('memberId')

   

    const response=await isMemberPartOfWorkspace(workspaceId,memberId)
    

    return NextResponse.json(successResponse(response,`${response.username} is the part of workspace `),{ status:StatusCodes.OK })
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