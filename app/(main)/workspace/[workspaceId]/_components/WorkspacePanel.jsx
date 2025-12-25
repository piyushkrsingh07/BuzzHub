'use client'
import { useGetWorkspaceById } from '@/app/hooks/workspaces/useGetWorkspaceByid'
import { AlertTriangleIcon, HashIcon, Loader, MessageSquareText, SendHorizonalIcon } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import WorkspacePanelHeader from './WorkspacePanelHeader'
import SideBarItem from './SideBarItem'
import WorkspacePanelSection from './WorkspacePanelSection'
import { useCreateChannelModal } from '@/app/hooks/channel/useCreateChannelModal'

const WorkspacePanel = () => {
  const params=useParams()
    console.log(params,'see params')
    const {workspaceId}=params
    console.log(workspaceId,'checking the workspace id')
    
    
        const {isFetching,workspace,isSuccess}=useGetWorkspaceById(workspaceId)

        const {setOpenCreateChannelModal}=useCreateChannelModal()
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
      <div className='flex flex-col px-2'>
         <SideBarItem
           label='Threads'
           icon={MessageSquareText}
           id='threads'
         variant='active'
         />
                 <SideBarItem
           label='Drafts & Sends'
           icon={SendHorizonalIcon}
           id='drafts'
         variant='default'
         />
      </div>
      <div>
        <WorkspacePanelSection label={'Channels'} onIconClick={()=>setOpenCreateChannelModal(true)}>
        {workspace?.data?.channels.map((channel)=>{
            return <SideBarItem  key={channel._id} icon={HashIcon} label={channel?.name} id={channel?._id}/>
        })}
        </WorkspacePanelSection>
      </div>
    </div>
  )
}

export default WorkspacePanel