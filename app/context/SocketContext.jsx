'use client'


import { createContext } from "react";
import { io } from "socket.io-client";

const SocketContext=createContext()

export const SocketContextProvider=({children})=>{

     const socket = io(process.env.BACKEND_SOCKET_URL)

return (
    <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
)
}

export default SocketContext