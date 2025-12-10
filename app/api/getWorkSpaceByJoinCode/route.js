import { connect } from "@/app/config/serverConfig.js";
import { getWorkspaceByJoinCode } from "@/app/services/workspaceService.js";

import { isAuthenticated } from "@/app/utils/common/authUtils.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects.js";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
      await connect()

                const token=request.headers.get('x-access-token')
      
                        const authenticated=await isAuthenticated(token)

                        const {_id}=authenticated
const {searchParams}=new URL(request.url)
      
              const joincode=searchParams.get("joinCode") 
              console.log(joincode," ",_id,"see join code and id")

const response=await getWorkspaceByJoinCode(joincode,_id)
   
return NextResponse.json(successResponse(response,`Successfully fetched workspace for ${joincode}`),{ status:StatusCodes.OK })
      
    }catch(error){
        console.log(error,'dekhna error kp')
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