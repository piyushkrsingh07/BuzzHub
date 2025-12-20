import { useMutation } from "@tanstack/react-query"
import { useAuth } from "../auth/useAuth"
import { createWorkspaceRequest } from "@/app/home/workspaceConfig/Workspace"

export const useCreateWorkspace=()=>{
    const {auth}=useAuth()

    const {isPending,isSuccess,error,mutateAsync:createWorkspaceMutation}=useMutation({
        mutationFn:(data)=>createWorkspaceRequest({...data,token:auth?.token}), //this is how we pass the custom argument in react query 
        onSuccess:(response)=>{
            console.log('Successfully created workspace',response)
           return response?.data?.data
        },
        onError:(error)=>{
            console.log('Failed to create workspace',error)
        }
    })

    return {
        isPending,
        isSuccess,
        error,
        createWorkspaceMutation
    }
}