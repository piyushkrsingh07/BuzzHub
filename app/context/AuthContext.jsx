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
      


      async function logout (){
      
             deleteCookie('token')
             deleteCookie('user')
     
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