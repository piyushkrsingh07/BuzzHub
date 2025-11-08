import { connect } from "@/app/config/serverConfig";
import { getWorkspacesUserIsMemberOfService } from "@/app/services/workspaceService";
import { isAuthenticated } from "@/app/utils/common/authUtils";
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
          
        await connect()

        
          console.log(request.headers.get('x-access-token'), 'see final token')

          const token=request.headers.get('x-access-token')

                  const {_id}=await isAuthenticated(token)

                  console.log(_id,"id jo middleware s aayaa hai")
           const {searchParams}=new URL(request.url)
        const search=searchParams.get('userId')
        console.log(search,"dekho search")
           //check if currently logged in user is showing the worksapces

           if(search.toString() !== _id.toString()){
            return NextResponse.json({message:"User is not authenticated to see workspaces"})
           }

           console.log("reached here")
     
        const response=await getWorkspacesUserIsMemberOfService(search)

           return NextResponse.json(successResponse(response,'Workspaces fetched successfully'),{ status:StatusCodes.OK })
    }catch(error){
             console.log(error)
             if(error.statusCode){
                 return NextResponse.json(
                     {
                         status:error.statusCode
                     },{
                         message:customErrorResponse(error)
                     }
                 )
             }
             return NextResponse.json(
                  { status:StatusCodes.INTERNAL_SERVER_ERROR },
                  {message:internalErrorResponse(error)}
             )
    }
    }
