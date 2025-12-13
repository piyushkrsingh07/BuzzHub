
import mongoose from "mongoose";

import Workspace from "./workspace.js";

const messageSchema=new mongoose.Schema({
    body:{
        type:String,
        required:[true,'Message body is required'] //plainning to create a substring match for finding a message
    },
    image:{
        type:String
    },
    channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel',
        required:[true,'Channel ID is required']
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Sender ID is required']
    },
    WorkspaceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Workspace',
        required:[true,'Workspace ID is required']
    }
})

const Message=mongoose.models.Message || mongoose.model('Message',messageSchema)

export default Message