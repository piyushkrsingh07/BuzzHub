'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import VerificationInput from 'react-verification-input'

const JoinPage = () => {
      const params=useParams()
      console.log("deklho params in join",params)
      const {workspaceId}=params
  return (
    <div className='h-[100vh] flex flex-col gap-y-8 items-center justify-center p-8 bg-white rounded-lg shadow-sm'>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
           <h1 className='font-bold text-3xl'>
            Join Workspace
           </h1>
           <p>
            Enter the code you received to join the workspace
           </p>
        </div>
        <VerificationInput 
         length={6}
         classNames={{
            container:'flex gap-x-2',
            character:'h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
            characterInactive:'bg-muted',
            characterFilled:'bg-white text-black',
            characterSelected:'bg-white text-black'
         }}
         autoFocus
        
        
        />
    </div>
  )
}

export default JoinPage