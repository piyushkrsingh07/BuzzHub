'use client'
import CreateChannelContext from "@/app/context/CreateChannelContext"
import { useContext } from "react"

export const useCreateChannelModal=()=>{
    return useContext(CreateChannelContext)
}