'use client'
import React, { useEffect } from 'react'
import { UserButton } from './_components/UserButton'
import { useFetchWorkspace } from '../hooks/workspaces/useFetchWorkspace'
import { useRouter } from 'next/navigation'
import { useCreateWorkspaceModal } from '../hooks/workspaces/useCreateWorkspaceModal'


const Home = () => {

  const {isFetching,workspaces}=useFetchWorkspace()
const router=useRouter()
const {setOpenWorkspaceModal}=useCreateWorkspaceModal()
  useEffect(()=>{

    if(isFetching) return
    console.log('workspace downloaded is ',workspaces)
    if(workspaces.length === 0 || !workspaces){
      console.log('no workspace found,creating one')
setOpenWorkspaceModal(true)
    }
    else{
      setTimeout(()=>{
 router.push(`/workspace/${workspaces?.data[0]?._id}`)
      },3000)
     
    }
  },[isFetching,workspaces])

  return (
    <>
    home
    <UserButton/>
  
    </>
  )
}

export default Home