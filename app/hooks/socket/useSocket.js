import SocketContext from "@/app/context/SocketContext"
import { useContext } from "react"

export const useSocket=()=>{
    return useContext(SocketContext)
}