'use client'
import CreateWorkspaceContext from "@/app/context/createWorkspaceContext"
import { useContext } from "react"

export const useCreateWorkspaceModal=()=>{
    return useContext(CreateWorkspaceContext)
}