import { StatusCodes } from "http-status-codes"
import channelRepository from "../repositories/channelRepository"
import ClientError from "../utils/errors/clientErrors"
import { isUserMemberOfWorkspace } from "./workspaceService"

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

    

    return channel

    }catch(error){
     console.log('Get channel by ID service error',error)
     throw error
    }
}