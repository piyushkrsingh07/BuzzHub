import { fetchWorkspacesRequest } from "@/app/home/workspaceConfig/Workspace"
import { useAuth } from "../auth/useAuth"
import { useQuery } from "@tanstack/react-query"

export const useFetchWorkspace=()=>{
    const {auth}=useAuth()
console.log('checking auth',auth,auth?.token)

    const {isFetching,isSuccess,error,data:workspaces}=useQuery({
       queryFn:()=>fetchWorkspacesRequest({auth,token:auth?.token}),
       queryKey:['fetchWorkspaces'],
       staleTime:30000
    })

    return {
        isFetching,
        isSuccess,
        error,
        workspaces
    }
}