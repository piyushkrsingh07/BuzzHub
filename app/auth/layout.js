import React from 'react'
import Signup from './signUp/page'


const Auth = ({children}) => {


  return (
    <div className='h-[100vh] flex justify-center items-center bg-main'>
         <div className='md:h-auto md:w-[420px]'>
         {children}
         </div>
    </div>
  )
}

export default Auth