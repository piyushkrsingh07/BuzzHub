
import workspaceRepository from "../repositories/workspaceRepository"
import {v4 as uuidv4} from 'uuid'
import ValidationError from "../utils/errors/validationError"
import { NextResponse } from "next/server"
import { internalErrorResponse } from "../utils/common/responseObjects"
import { StatusCodes } from "http-status-codes"
import channelRepository from "../repositories/channelRepository"
import ClientError from "../utils/errors/clientErrors"
import userRepository from "../repositories/userRepository"



const isUserAdminOfWorkspace=(workspace,userId)=>{
       return workspace.members.find((member)=>member.memberId.toString() === userId.toString() && member.role === 'admin')
}

const isUserMemberOfWorkspace=(workspace,userId)=>{
    return workspace.members.find((member)=>member.memberId.toString() === userId.toString())
}
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
                throw error

                 

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


export const deleteWorkSpaceService=async(workspaceId,userId)=>{
    try{
   const workspace=await workspaceRepository.getById(workspaceId)
   
   if(!workspace){
    throw new ClientError({
        explaination:'Invalid data sent from the client',
        message:'Workspace not found',
        statusCode:StatusCodes.NOT_FOUND
    })
   }
   const isAllowed=isUserAdminOfWorkspace(workspaceId,userId)

//    const channelId=workspace.channels.map((channel)=>channel._id)
if(isAllowed){
 await channelRepository.deleteMany(workspace.channels)
   
const response=await workspaceRepository.delete(workspaceId)
return response
}
throw new ClientError({
    explaination:'User is either not a member or admin of workspace',
    message:'User is not allowed to delete the workspace',
    StatusCodes:StatusCodes.UNAUTHORIZED
})
    }catch(error){
        console.log(error)
        throw error
    }


}

export const getWorkspaceService=async(workspaceId,userId)=>{
    try{
       const workspace=await workspaceRepository.getById(workspaceId)
       if(!workspace){
        throw new ClientError({
            explaination:'Invalid data sent from the client',
            message:'Workspace not found',
            statusCode:StatusCodes.NOT_FOUND
        })
       }

       const isMember=isUserMemberOfWorkspace(workspace,userId)

       if(!isMember){
        throw new ClientError({
            explaination:'User is not a member of workspace',
            message:'User is not a member of workspace',
            statusCode:StatusCodes.UNAUTHORIZED
        })
       }

       return workspace
    }catch(error){
        console.log('Get workspace service error',error)
        throw error
    }
}

export const getWorkspaceByJoinCode=async(joincode,userId)=>{
    try{

        const workspace=await workspaceRepository.getWorkspaceByJoinCode(joincode)
        if(!workspace){
            throw new ClientError({
                explaination:'Invalid data sent from the client',
                message:'Workspace not found',
                statusCode:StatusCodes.NOT_FOUND
            })
        }

        const isMember=isUserMemberOfWorkspace(workspace,userId)

        if(!isMember){
            throw new ClientError({
                explaination:'User is not a member of the workspace',
                message:'User is not a member of the workspace',
                statusCode:StatusCodes.UNAUTHORIZED
            })
        }

        return workspace
    }catch(error){
        console.log('Get workspace by join code service error',error)
        throw error
    }
}

export const updateWorkspaceService=async(workspaceId,workspaceData,userId)=>{
   try{
         const workspace=await workspaceRepository.getById(workspaceId)
        if(workspace){
            throw new ClientError({
                explaination:'Invalid dta sent from the client',
                message:'Workspace not found',
                statusCode:StatusCodes.NOT_FOUND
            })
        }

        const isAdmin=isUserAdminOfWorkspace(workspace,userId)
        if(!isAdmin){
            throw new ClientError({
                explaination:'User is not an admin of the workspace',
                message:'User is not an admin of the workspace',
                statusCode:StatusCodes.UNAUTHORIZED
            })
        }

        const updatedWorkspace=await workspaceRepository.update(workspaceId,workspaceData)

        return updatedWorkspace
   }catch(error){
 console.log('failed to update the workspace',error)
        throw error
   }
}

export const addMemberToWorkspaceService=async(workspaceId,memberId,role)=>{
    try{
 const workspace=await workspaceRepository.getWorkspaceByJoinCode(joincode)
        if(!workspace){
            throw new ClientError({
                explaination:'Invalid data sent from the client',
                message:'Workspace not found',
                statusCode:StatusCodes.NOT_FOUND
            })
        }
      const isUserValid=await userRepository.getById(memberId)

      if(!isUserValid){
        throw new ClientError({
            explaination:'User is not a member of the workspace',
            message:'User is not a member of the workspace',
            statusCode:StatusCodes.UNAUTHORIZED
        })
      }
        const isMember=isUserMemberOfWorkspace(workspace,memberId)

        if(isMember){
            throw new ClientError({
                explaination:'User is already a member of the workspace',
                message:'User is already a member of the workspace',
                statusCode:StatusCodes.UNAUTHORIZED
            })
        }
    }catch(error){

    }
}