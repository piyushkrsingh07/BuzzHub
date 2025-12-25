'use client'
import { useGetWorkspaceById } from '@/app/hooks/workspaces/useGetWorkspaceByid'
import { AlertTriangleIcon, Loader } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import WorkspacePanelHeader from './WorkspacePanelHeader'

const WorkspacePanel = () => {
  const params=useParams()
    console.log(params,'see params')
    const {workspaceId}=params
    console.log(workspaceId,'checking the workspace id')
    
    
        const {isFetching,workspace,isSuccess}=useGetWorkspaceById(workspaceId)
        console.log(workspace,'see worksapce received')
        if(isFetching){
            return (
                <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white'>
                    <Loader className='animate-spin size-6 text-white'/>
                </div>
            )
        }

        if(!isSuccess){
             return (
                <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white'>
                    <AlertTriangleIcon className='size-6 text-white'/>
                    Something went wrong
                </div>
            )
        }
  return (
    <div className='flex flex-col h-full bg-medium'>
      <WorkspacePanelHeader workspace={workspace}/>
    </div>
  )
}

export default WorkspacePanel