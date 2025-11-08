
import workspaceRepository from "../repositories/workspaceRepository"
import {v4 as uuidv4} from 'uuid'
import ValidationError from "../utils/errors/validationError"
import { NextResponse } from "next/server"
import { internalErrorResponse } from "../utils/common/responseObjects"
import { StatusCodes } from "http-status-codes"

export const createWorkSpaceService=async(workspaceData,channelName)=>{
    
   try{

       const joinCode =uuidv4().substring(0,6)

    const response=await workspaceRepository.create({
            name:workspaceData.name,
            description:workspaceData.description,
            joinCode
    })

    console.log(response,'see api response')
console.log(workspaceData,'see bdcoe ')
 const newMembers= await workspaceRepository.addMemberToWorkspace(
        response._id,
        workspaceData.owner,
        'admin'
    )

    console.log(newMembers,'see new members')
   const updatedWorkspace =  await workspaceRepository.addChannelToWorkspace(
        response._id,
       'testing channel'
    )

    console.log(updatedWorkspace,'see new workspace')
    return updatedWorkspace
    //workspace should have atleast one channel
   }catch(error){
      console.log('Error during workspace creation',error)

             if(error.name === 'ValidationError'){
           throw new ValidationError({
            error:error.errors //it is like an object which put all errors in place
           },
        error.message
        )
       }

       if(error.name === 'MongoServerError' && error.code === 11000){
        throw new ValidationError(
            {
                error:['A workspace with same details already exists'],
       
            },
            'A workspace with same details already exists'
        )
       }
                 return NextResponse.json((internalErrorResponse(error)),{ status:StatusCodes.INTERNAL_SERVER_ERROR })

                 

   }


}

export const getWorkspacesUserIsMemberOfService=async(userId)=>{
  try{
   console.log("yah dekho aaye h ki nhi aayer hai")
     const response=await workspaceRepository.fetchAllWorkspaceByMemberId(userId)
     console.log("dekho jo beech s return hua hai")
     return response
  }catch(error){
      console.log('Get workspaces user is member of service error',error)
  }
}