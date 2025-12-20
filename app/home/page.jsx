'use client'
import React, { useEffect } from 'react'
import { UserButton } from './_components/UserButton'
import { useFetchWorkspace } from '../hooks/workspaces/useFetchWorkspace'
import { useRouter } from 'next/navigation'


const Home = () => {

  const {isFetching,workspaces}=useFetchWorkspace()
const router=useRouter()
  useEffect(()=>{

    if(isFetching) return
    console.log('workspace downloaded is ',workspaces)
    if(workspaces.length === 0 || !workspaces){
      console.log('no workspace found,creating one')
    }
    else{
      setTimeout(()=>{
 router.push(`/workspace?workspaceId=${workspaces?.data[0]?._id}`)
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