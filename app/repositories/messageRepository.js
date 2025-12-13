
import Message from "../model/message.js"
import crudRepository from "./crudRepository.js"

import User from "../model/user.js"


const messageRepository = {
   ...crudRepository(Message),
   getPaginatedMessaged:async(messageParams,page,limit)=>{
      console.log(messageParams,'reached here')
      const messages=await Message.find(messageParams)
      .sort({createdAt:-1})
      .skip((page-1)*limit)
      .limit(limit)
      .populate('senderId','username email avatar')
      .populate('channelId')
    console.log(messages,'checking messages')
      return messages
      
   }
}

export default messageRepository