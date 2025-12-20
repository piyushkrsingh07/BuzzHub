'use client'
import { deleteCookie, getCookie } from "cookies-next"
import { useRouter } from "next/navigation"

import {  createContext, useEffect, useState } from "react"

const AuthContext=createContext()

export const AuthContextProvider=({children})=>{

    const router=useRouter()

    const [auth,setAuth]=useState({
        user:null,
        token:null,
        isLoading:true

    })
      
            const user=getCookie('user')
 
        const token = getCookie('token')
      useEffect(()=>{

          if (!user || !token) {
    setAuth(prev => ({ ...prev, isLoading: false }))
    return
  }

        console.log(user,token,'see user and token in auth provider')
      
            setAuth({
                user:JSON.parse(user),
                token:token,
                isLoading:false
            })
        
      },[user,token])


      async function logout (){
      
             deleteCookie('token')
             deleteCookie('user')
     
            setAuth({
                user:null ,
                token:null,
                isLoading:false
          
        })
        router.refresh()
        router.push('/auth/signIn')
    
}

    return (
        <AuthContext.Provider value={{auth,setAuth,logout}}>
             {children}
        </AuthContext.Provider>
    )
}

export default AuthContext