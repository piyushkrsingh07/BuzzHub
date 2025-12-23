import WorkspacePreferencesModalContext from "@/app/context/WorkspacePreferencesModalContext"
import { useContext } from "react"

export const useWorkspacePreferencesModal=()=>{
      return useContext(WorkspacePreferencesModalContext)
}