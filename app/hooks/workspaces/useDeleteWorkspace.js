'use client'
import { deleteWorkspaceRequest } from "@/app/home/workspaceConfig/Workspace"
import { useAuth } from "../auth/useAuth"
import { useMutation } from "@tanstack/react-query"

export const useDeleteWorkspace=()=>{
    
      const {auth}=useAuth()
    const {isPending,isSuccess,error,mutateAsync:deleteWorkspaceMutation}=useMutation({
        mutationFn:(workspaceId)=>deleteWorkspaceRequest(workspaceId,auth?.token),
        onSuccess:()=>{
            console.log('Workspace deleted successfully')

        },
        onError:(error)=>{
            console.log('Error in deleting workspace',error)
        }
    })
    return {
    isPending,
    isSuccess,
    error,
    deleteWorkspaceMutation
}
}

