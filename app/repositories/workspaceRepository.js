import { StatusCodes } from "http-status-codes"
import Workspace from "../model/workspace"
import ClientError from "../utils/errors/clientErrors"
import crudRepository from "./crudRepository"
import User from "../model/user"
import { channel } from "diagnostics_channel"
import Channel from "../model/channel"
import channelRepository from "./channelRepository"


const workspaceRepository={
    ...crudRepository(Workspace),
    getWorkspaceDetailsById:async function (workspaceId){
      const workspace=await Workspace.findById(workspaceId)
       .populate('members.memberId','username email avatar')
       .populate('channels')

       return workspace
    },
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
           
        console.log(memberId,'see member bdcoe')
        const workspace=await Workspace.findById(workspaceId)
           console.log(workspace,'DEKHO WORKSPACE')
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
    addChannelToWorkspace:async function(workspaceId,channelName){
        
        const workspace=await Workspace.findById(workspaceId).populate("channels")
           console.log(workspace,'see workspace')
          if(!workspace){
            throw new ClientError({
                explaination:'Invalid data sent from the client',
                message:'Workspace not found ',
                statusCode:StatusCodes.NOT_FOUND
            })
          }

          const isChannelPartOfWorkspace=workspace.channels.find((channel)=>channel.name === channelName)
          
          if(isChannelPartOfWorkspace){
             throw new ClientError({
                explaination:'Invalid data sent from client',
                message:'Channel already part of workspace',
                statusCode:StatusCodes.FORBIDDEN    
             })
          }

          const channel=await channelRepository.create({name:channelName,workspaceId:workspaceId})
console.log(channel,'dekho channel ko')
          workspace.channels.push(channel)

          await workspace.save()

          return workspace
    },
    fetchAllWorkspaceByMemberId:async function(memberId){
        const workspaces=await Workspace.find({'members':{$elemMatch:{
             memberId:memberId
        }}}).populate('members.memberId','username email avatar')
console.log("dekho jo stage 2 se retun hua hai",workspaces)
        return workspaces

    }
}

export default workspaceRepository