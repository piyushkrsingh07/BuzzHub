'use client'
import React, { useState } from 'react'
import { Editor } from './Editor'
import MessageRenderer from './MessageRenderer'
import { useSocket } from '@/app/hooks/socket/useSocket'
import { useCurrentWorkspace } from '@/app/hooks/workspaces/useCurrentWorkspace'
import { useAuth } from '@/app/hooks/auth/useAuth'

const ChatInput = () => {

    const [text,setText]=useState('')

    const {socket,currentChannel}=useSocket()
    const {auth}=useAuth()
    console.log(auth,'see auth bdcoe')
    const {currentWorkspace}=useCurrentWorkspace()
    console.log(currentWorkspace,'see current workspace big data')
   
  console.log({channelId:currentChannel,senderId:auth?.user?._id,workspaceId:currentWorkspace?.data?._id},'heloo gh')

    const handleSubmit=({body})=>{
  console.log(body,'dekho body')
  socket?.emit("NewMessage",{
    channelId:currentChannel,
    body,
    senderId:auth?.user?.userId,
    WorkspaceId:currentWorkspace?.data?._id

  },(data)=>{
    console.log('Message sent ',data)
  })
  setText(body)

    }
  return (
 <div
            className="px-5 w-full"
        >
            <Editor 
                placeholder="Type a message..."
                onSubmit={handleSubmit}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""
                
            />

            {text && <MessageRenderer value={text}/>}

            
        </div>
  )
}

export default ChatInput