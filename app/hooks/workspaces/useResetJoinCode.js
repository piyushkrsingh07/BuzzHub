'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../auth/useAuth"
import { resetJoinCode } from "@/app/home/workspaceConfig/Workspace"


export const useResetJoinCode=(workspaceId)=>{
    const {auth}=useAuth()
    const queryClient=useQueryClient()
    const {isSuccess,isPending,error,mutateAsync:resetJoinCodeMutation}=useMutation({
        mutationFn:()=>resetJoinCode({workspaceId,token:auth?.token}),
        onSuccess:()=>{
          console.log('Successfully reset join code')
           queryClient.invalidateQueries({queryKey:[`fetchWorkspaceById-${workspaceId}`]})
        },
        onError:(error)=>{
            console.log('Error in reseting the join code')
        }
    })

    return {
        resetJoinCodeMutation,
        isSuccess,
        isPending,
        error
    }

}