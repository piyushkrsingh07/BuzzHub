
import { connect } from "../config/serverConfig.js"
import messageRepository from "../repositories/messageRepository.js"
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED_EVENT } from "../utils/common/eventConstants.js"

export const createMessageService=async(message)=>{
  
    console.log("dekho jo data bhja hai",message,typeof message)
    const newMessage=await messageRepository.create(message)

    return newMessage
}



export default async function messageHandlers (io,socket){
      await connect()
        socket.on(NEW_MESSAGE_EVENT,async function createMessageHandler(data,cb){
    console.log(data,typeof data,'see data received')

    const {channelId}=data;
const messageResponse=await createMessageService(JSON.parse(data));
// socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT,messageResponse) to emit to every user 

console.log(messageResponse,'see message response')
io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT,messageResponse);
cb({
    success:true,
    message:'Successfully created the message',
    data:messageResponse
})
console.log(messageRepository,'DEKHO MESSAGE RESPONSE')
return messageResponse
     })
}