
import { StatusCodes } from "http-status-codes";
import workspaceRepository from "../repositories/workspaceRepository"
import ClientError from "../utils/errors/clientErrors";
import { isUserMemberOfWorkspace } from "./workspaceService"
import userRepository from "../repositories/userRepository";

export const isMemberPartOfWorkspace=async(workspaceId,memberId)=>{
    const workspace=await workspaceRepository.getById(workspaceId)

    if(!workspace){
        throw new ClientError({
            explaination:'Workspace not found',
            message:'Workspace not found',
            statusCode:StatusCodes.NOT_FOUND
        })
    }

    const isUserMember=isUserMemberOfWorkspace(workspace,memberId);

    if(!isUserMember){
        throw new ClientError({
            explaination:'User is not a member of the workspace',
            message:'User is not a member of te workspace',
            statusCode:StatusCodes.UNAUTHORIZED
        })
    }

    const user=await userRepository.getById(memberId);
return user
}