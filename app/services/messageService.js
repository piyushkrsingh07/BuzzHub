import { StatusCodes } from "http-status-codes"
import channelRepository from "../repositories/channelRepository.js"
import messageRepository from "../repositories/messageRepository.js"
import ClientError from "../utils/errors/clientErrors.js"
import { isMemberPartOfWorkspace } from "./memberService.js"
import { isUserMemberOfWorkspace } from "./workspaceService.js"

export const getMessageService = async(messageParams,page,limit,userId)=>{

    const channelDetails=await channelRepository.getChannelWithWorkspaceDetails(messageParams.channelId)

    const workspace=channelDetails.workspaceId

    const isMember=await isUserMemberOfWorkspace(workspace,userId)

    if(!isMember){
        throw new ClientError({
            explaination:'User is not a member of workspace',
            message:'User is not a member of the workspace',
            statusCode:StatusCodes.UNAUTHORIZED
        })
    }

    const messages=await messageRepository.getPaginatedMessaged(
        messageParams,
        page,
        limit
    )
    return messages
}

// client <----------> server

export default function messageHandlers(io,socket){
        socket.on('messageFromClient',(data)=>{
      console.log('Message from client',data)

      io.emit('new message',data.toUpperCase())
    })
}