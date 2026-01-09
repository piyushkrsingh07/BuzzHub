'use client'
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../auth/useAuth"
import { fetchWorkspaceDetailsRequest } from "@/app/home/workspaceConfig/Workspace"

export const useGetWorkspaceById=(id)=>{
 const {auth}=useAuth()
 console.log('checking the id received',id)
    const {isFetching,isSuccess,error,data:workspace}=useQuery({
        
        queryKey:[`fetchWorkspaceById-${id}`],
        queryFn:({queryKey})=>{
            console.log(queryKey,'checking qury key')
            const workspaceId=queryKey[0]?.split('-')[1]
            console.log(workspaceId,'see working if')
            if(!workspaceId) return
      return fetchWorkspaceDetailsRequest(workspaceId, auth?.token)
        },
         enabled: Boolean(id && auth?.token),
         refetchOnWindowFocus: false,

        // staleTime:10000
    })

    return {
        isFetching,
        isSuccess,
        error,
        workspace
    }
}