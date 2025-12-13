import { StatusCodes } from "http-status-codes"
import channelRepository from "../repositories/channelRepository.js"
import ClientError from "../utils/errors/clientErrors.js"
import { isUserMemberOfWorkspace } from "./workspaceService.js"
import messageRepository from "../repositories/messageRepository.js"


export const getChannelById=async(channelId,userId)=>{
    try{
    const channel=await channelRepository.getChannelWithWorkspaceDetails(channelId)
  
    console.log(channel,'dekho channel')

        if(!channel || !channel.workspaceId){
        throw new ClientError({
            message:'Channel not found',
            explaination:'Invalid data sent from the client',
            statusCode:StatusCodes.NOT_FOUND
        })
    }
      
    const isUserPartOfWorkspace=isUserMemberOfWorkspace(channel.workspaceId,userId)

    if(!isUserPartOfWorkspace){
        throw new ClientError({
            message:'User is not member of workspace and hence cannot access the channel',
            explaination:'User is not a member of the workspace',
            statusCode:StatusCodes.UNAUTHORIZED
        })
    }

    const messages=await messageRepository.getPaginatedMessaged({
        channelId
    },
1,
20)
    console.log(messages,'see messages here')

    return {messages,
        _id:channel._id,
        name:channel.name,
        workspaceId:channel.workspaceId,
        createdAt:channel.createdAt,
        updatedAt:channel.updatedAt
    }

    }catch(error){
     console.log('Get channel by ID service error',error)
     throw error
    }
}