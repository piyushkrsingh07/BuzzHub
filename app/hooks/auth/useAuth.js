'use client'
import AuthContext from "@/app/context/AuthContext"
import { useContext } from "react"


export const useAuth=()=>{
    return useContext(AuthContext)
}