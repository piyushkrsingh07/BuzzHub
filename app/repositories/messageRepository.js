
import Message from "../model/message.js"
import crudRepository from "./crudRepository.js"

import User from "../model/user.js"


const messageRepository = {
   ...crudRepository(Message),
   getPaginatedMessaged:async(messageParams,page,limit)=>{
      const messages=await Message.find(messageParams)
      .sort({createdAt:-1})
      .skip((page-1)*limit)
      .limit(limit)
      .populate('senderId','username email avatar')
      .populate('channelId')
    
      return messages
      
   }
}

export default messageRepository