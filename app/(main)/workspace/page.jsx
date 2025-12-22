'use client'
import React from 'react'
import WorkspaceSideBar from "./_components/WorkspaceSideBar"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import WorkspaceNavBar from './_components/WorkspaceNavBar'




const WorkspaceLayout = ({children}) => { 
  return (
     <div className="h-[100vh] overflow-y-hidden"> 
     <WorkspaceNavBar/>
        <div className="flex h-[calc(100vh-40px)]">
          <WorkspaceSideBar/>
       
          <ResizablePanelGroup direction="horizontal" >
            <ResizablePanel
              defaultSize={500}
              minSize={100}
              className='bg-medium '
            
            >
              <div>
                  Sidebar
              </div>

            </ResizablePanel> 
            <ResizableHandle withHandle/>
            <ResizablePanel
              minSize={20}
            >
                   {children}
              
            </ResizablePanel>
          </ResizablePanelGroup>
   

        </div>
    </div>
  )
}

export default WorkspaceLayout