'use client'
import React from 'react'
import WorkspaceSideBar from "./_components/WorkspaceSideBar"
import { WorkSpaceOptions } from './_components/WorkspaceOptions'

const WorkspaceLayout = ({children}) => {
  return (
     <div className="h-[100vh] overflow-y-hidden"> 
     <WorkSpaceOptions/>
        <div className="flex h-[90%]">
          <WorkspaceSideBar/>
          {children}
        </div>
    </div>
  )
}

export default WorkspaceLayout