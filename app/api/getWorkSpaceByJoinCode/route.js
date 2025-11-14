import { connect } from "@/app/config/serverConfig";
import { getWorkspaceByJoinCode } from "@/app/services/workspaceService";

import { isAuthenticated } from "@/app/utils/common/authUtils";
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
      await connect()

                const token=request.headers.get('x-access-token')
      
                        const {_id}=await isAuthenticated(token)
const {searchParams}=new URL(request.url)
      
              const joincode=searchParams.get("joinCode") 
              console.log(joincode," ",_id,"see join code and id")

const response=await getWorkspaceByJoinCode(joincode,_id)
   
return NextResponse.json(successResponse(response,`Successfully fetched workspace for ${joincode}`),{ status:StatusCodes.OK })
      
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