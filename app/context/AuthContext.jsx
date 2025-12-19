'use client'
import { deleteCookie } from "cookies-next"
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
      
      useEffect(()=>{
        const user=localStorage.getItem('user')
        const token=localStorage.getItem('token')

        console.log(user,token,'see user and token in auth provider')
        if(user && token){
            setAuth({
                user:JSON.parse(user),
                token:token,
                isLoading:false
            })
        }
      },[router])

      async function logout (){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
             deleteCookie('token')
     
            setAuth({
                user:null ,
                token:null,
                isLoading:false
          
        })
        router.refresh()
    
}

    return (
        <AuthContext.Provider value={{auth,setAuth,logout}}>
             {children}
        </AuthContext.Provider>
    )
}

export default AuthContext