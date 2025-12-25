'use client'
import { addChannelToWorkspace } from "@/app/home/workspaceConfig/Workspace"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "../auth/useAuth"

export const useAddChannelToWorkspace = (workspaceId)=>{
    const {auth}=useAuth()
    const {isPending,isSuccess,mutateAsync:addChannelToWorkspaceMutation,error}=useMutation({
    mutationFn:(channelName)=>addChannelToWorkspace({workspaceId,channelName,token:auth?.token}),
    onSuccess:(data)=>{
        console.log('Channel added to workspace',data)
    },
    onError:(error)=>{
        console.log('Error adding channel to workspace',error)
    }
    })

    return {
        addChannelToWorkspaceMutation,
        isPending,
        isSuccess,
        error
    }
}