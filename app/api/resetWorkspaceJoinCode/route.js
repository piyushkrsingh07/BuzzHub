import { connect } from "@/app/config/serverConfig"
import { resetWorkspaceJoinCode } from "@/app/services/workspaceService"
import { isAuthenticated } from "@/app/utils/common/authUtils"
import { successResponse } from "@/app/utils/common/responseObjects"
import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export async function PUT(request){
     try{
      await connect()
     const token=request.headers.get('x-access-token')
    
     const {searchParams}=new URL(request.url)
    
     const workspaceId=searchParams.get('workspaceId')
     const authenticated=await isAuthenticated(token)
     
     const {_id}=authenticated

     const response=await resetWorkspaceJoinCode(workspaceId,_id)


     return NextResponse.json(successResponse(response,`Successfully updated workspace join code`),{ status:StatusCodes.OK })
     }catch(error){

     }
}