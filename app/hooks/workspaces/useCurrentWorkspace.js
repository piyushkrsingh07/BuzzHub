import WorkspaceContext from "@/app/context/WorkspaceContext"
import { useContext } from "react"

export const useCurrentWorkspace=()=>{
    return useContext(WorkspaceContext)
}