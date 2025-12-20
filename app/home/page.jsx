'use client'
import React, { useEffect } from 'react'
import { UserButton } from './_components/UserButton'
import { useFetchWorkspace } from '../hooks/workspaces/useFetchWorkspace'


const Home = () => {

  const {isFetching,workspaces}=useFetchWorkspace()

  useEffect(()=>{

    if(isFetching) return
    console.log('workspace downloaded is ',workspaces)
  },[isFetching,workspaces])

  return (
    <>
    home
    <UserButton/>
  
    </>
  )
}

export default Home