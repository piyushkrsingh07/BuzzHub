import { connect } from "@/app/config/serverConfig.js";
import { getChannelById } from "@/app/services/channelService.js";
import { isAuthenticated } from "@/app/utils/common/authUtils.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects.js";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";


export async function GET(request){
    try{
     await connect()

     const {searchParams}=new URL(request.url)
     const channelId=searchParams.get('channelId')

     const token=request.headers.get('x-access-token')
     
    const authenticatedUser=await isAuthenticated(token)
    const {_id}=authenticatedUser

           const response=await getChannelById(channelId,_id)
return NextResponse.json(successResponse(response,'Channel fetched successfully'),{ status:StatusCodes.OK })

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