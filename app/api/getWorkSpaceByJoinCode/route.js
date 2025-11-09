import { connect } from "@/app/config/serverConfig";
import workspaceRepository from "@/app/repositories/workspaceRepository";
import { customErrorResponse } from "@/app/utils/common/responseObjects";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
      await connect()

                const token=request.headers.get('x-access-token')
      
                        const {_id}=await isAuthenticated(token)
const {searchParams}=new URL(request.url)
      
              const joincode=searchParams.get("joinCode") 

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