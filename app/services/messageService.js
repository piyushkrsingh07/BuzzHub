import { StatusCodes } from "http-status-codes"
import channelRepository from "../repositories/channelRepository"
import messageRepository from "../repositories/messageRepository"
import ClientError from "../utils/errors/clientErrors"
import { isMemberPartOfWorkspace } from "./memberService"
import { isUserMemberOfWorkspace } from "./workspaceService"

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
