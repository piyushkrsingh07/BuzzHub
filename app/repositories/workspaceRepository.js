import { StatusCodes } from "http-status-codes"
import Workspace from "../model/workspace"
import ClientError from "../utils/errors/clientErrors"
import crudRepository from "./crudRepository"
import User from "../model/user"


const workspaceRepository={
    ...crudRepository(Workspace),
    getWorkspaceByName:async function(workspaceName){
        const workspace=await Workspace.findOne({
            name:workspaceName
        })

        if(!workspace){
            throw new ClientError({
                explaination:'Invalid data sent from the client',
                message:'Workspace not found',
                statusCode:StatusCodes.NOT_FOUND
            })
        }

        return workspace
    },
    getWorkspaceByJoinCode:async function(joinCode){
                 const workspace=await Workspace.findOne({
            joinCode
        })

        if(!workspace){
            throw new ClientError({
                explaination:'Invalid data sent from the client',
                message:'Workspace not found',
                statusCode:StatusCodes.NOT_FOUND
            })
        }

        return workspace
    },
    addMemberToWorkspace:async function(workspaceId,memberId,role){
           
        const workspace=await Workspace.findById(workspaceId)

        if(!workspace){
            throw new ClientError({
                explaination:'Invalid data sent from the client',
                message:'Workspace not found',
                statusCode:StatusCodes.NOT_FOUND
            }
            )
        }
       
        const isValidUser=await User.findById(memberId)
        if(!isValidUser){
            throw new ClientError({
                explaination:"Invalid data sent from the client",
                message:"User not found ",
                statusCode:StatusCodes.NOT_FOUND
            })
        }

        const isMemberAlreadyPartOfWorkspace=workspace.members.some((member)=>member.memberId.toString() === memberId.toString())


        if(isMemberAlreadyPartOfWorkspace){
                        throw new ClientError({
                explaination:"Invalid data sent from the client",
                message:"User already part of workspace ",
                statusCode:StatusCodes.NOT_FOUND
            })
        }
        workspace.members.push({
            memberId,
            role
        })

        await workspace.save()

        return workspace
    },
    addChannelToWorkspace:async function(){

    },
    fetchAllWorkspaceByMemberId:async function(){

    }
}

export default workspaceRepository