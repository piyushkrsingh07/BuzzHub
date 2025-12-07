
import Message from "../model/message"
import crudRepository from "./crudRepository"

import User from "../model/user"


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