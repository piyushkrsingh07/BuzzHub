'use client'
import { createContext, useState } from "react"

const CreateWorkspaceContext=createContext()

export const CreateWorkspaceProvider=({children})=>{

    const [openWorkspaceModal,setOpenWorkspaceModal]=useState(false)
    return (
        <CreateWorkspaceContext.Provider value={{openWorkspaceModal,setOpenWorkspaceModal}}>
          {children}
        </CreateWorkspaceContext.Provider>
    )
}

export default CreateWorkspaceContext