import {createServer} from "node:http"

import next from "next"
import { Server } from "socket.io"

import messageHandlers from "./app/services/messageService.js"


const dev=process.env.NODE_ENV !== 'production'
const hostname='localhost'
const port=3000;
const app=next({dev})

const handle = app.getRequestHandler()

app.prepare().then(()=>{
    const httpServer = createServer(handle)

    const io=new Server(httpServer)

    io.on('connection',(socket)=>{
        console.log(`User connected :${socket.id}`)

        setTimeout(()=>{
         socket.emit('message','This is the message from the server') //server is sending the data
        },3000)
messageHandlers(io,socket)
    })

    

  
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`server running on http://${hostname}:${port}`);
    });
})