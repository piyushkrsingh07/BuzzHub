'use client'
import React from 'react'
import WorkspaceLayout from '../../page'
import { useParams } from 'next/navigation'

const ChannelPage = () => {

  const {id}=useParams()
  return (
<WorkspaceLayout>
  Channel {id} 
</WorkspaceLayout> 
  )
}

export default ChannelPage