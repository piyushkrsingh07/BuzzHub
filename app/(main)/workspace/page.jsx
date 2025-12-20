
import React from 'react'
import WorkspaceSideBar from "./_components/WorkspaceSideBar"

const WorkspaceLayout = ({children}) => {
  return (
     <div className="h-[100vh]"> 
        <div className="flex h-full">
          <WorkspaceSideBar/>
          {children}
        </div>
    </div>
  )
}

export default WorkspaceLayout