import { useMutation } from "@tanstack/react-query"
import { useAuth } from "../auth/useAuth"
import { createWorkspaceRequest } from "@/app/(main)/workspace/workspaceConfig/Workspace"

export const useCreateWorkspace=()=>{
    const {auth}=useAuth()

    const {isPending,isSuccess,error,mutateAsync:createWorkspaceMutation}=useMutation({
        mutationFn:(data)=>createWorkspaceRequest({...data,token:auth?.token}), //this is how we pass the custom argument in react query 
        onSuccess:(data)=>{
            console.log('Successfully created workspace',data)
        },
        onError:(error)=>{
            console.log('Failed to creat workspace',error)
        }
    })

    return {
        isPending,
        isSuccess,
        error,
        createWorkspaceMutation
    }
}