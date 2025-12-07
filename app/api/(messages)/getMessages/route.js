import { connect } from "@/app/config/serverConfig"
import { getMessageService } from "@/app/services/messageService"
import { successResponse } from "@/app/utils/common/responseObjects"
import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export async function GET (request){
   try{
      await connect()
      const {searchParams}=new URL(request.url)
      
      

              const channelId=searchParams.get('channelId')

              const page=searchParams.get('page') || 1
              const limit=searchParams.get('limit') || 20
                const token=request.headers.get('x-access-token')
    const {_id}=  await isAuthenticated(token)
      

      const messages=await getMessageService(
        {
          channelId:channelId,
        
        },
      page,
      limit,
      _id
    )
return NextResponse.json(successResponse(messages,'Messages fetched successfully'),{ status:StatusCodes.OK })

      
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