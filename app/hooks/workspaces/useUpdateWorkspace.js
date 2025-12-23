import {  updateWorkspaceRequest } from "@/app/home/workspaceConfig/Workspace"
import { useAuth } from "../auth/useAuth"
import { useMutation } from "@tanstack/react-query"

export const useUpdateWorkspace=(workspaceId)=>{
    
      const {auth}=useAuth()
    const {isPending,isSuccess,error,mutateAsync:UpdateWorkspaceMutation}=useMutation({
        mutationFn:(name)=>updateWorkspaceRequest({workspaceId,name,token:auth?.token}),
        onSuccess:()=>{
            console.log('Workspace updated  successfully')

        },
        onError:(error)=>{
            console.log('Error in updating workspace',error)
        }
    })
    return {
    isPending,
    isSuccess,
    error,
  UpdateWorkspaceMutation
}
}
