import workspaceRepository from "../repositories/workspaceRepository"
import {v4 as uuidv4} from 'uuid'

export const createWorkSpaceService=async(workspaceData,channelName)=>{

       const joinCode =uuidv4().substring(0,6)

    const response=await workspaceRepository.create({
            name:workspaceData.name,
            description:workspaceData.description,
            joinCode
    })


    await workspaceRepository.addMemberToWorkspace(
        response._id,
        workspaceData.owner,
        'admin'
    )

    await workspaceRepository.addChannelToWorkspace(
        response._id,
       channelName
    )

    return response
    //workspace should have atleast one channel


}