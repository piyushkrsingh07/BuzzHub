'use client'
import React from 'react'
import WorkspaceLayout from '../../page'
import { useParams } from 'next/navigation'
import { Editor } from './_components/Editor'
import ChatInput from './_components/ChatInput'
import MessageRenderer from './_components/MessageRenderer'
import { useSocket } from '@/app/hooks/socket/useSocket'

const ChannelPage = () => {

   const {id}=useParams()

   const {joinChannel}=useSocket()

   joinChannel(id)
  return (
<WorkspaceLayout>
  <div className='flex flex-col h-full'>
                     

            
            <div className='flex-1' /> 
            <ChatInput />
        </div>
</WorkspaceLayout> 
  )
}

export default ChannelPage