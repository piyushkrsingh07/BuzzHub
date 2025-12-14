import React from 'react'
import Signup from './_components/sign-up'

const Auth = () => {


  return (
    <div className='h-[100vh] flex justify-center items-center bg-[#5c3b58]'>
         <div className='md:h-auto md:w-[420px]'>
             <Signup/>
         </div>
    </div>
  )
}

export default Auth