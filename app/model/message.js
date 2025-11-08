import { channel } from "diagnostics_channel";
import mongoose from "mongoose";
import { required } from "zod/v4/core/util.cjs";
import Workspace from "./workspace";

const messageSchema=new mongoose.Schema({
    body:{
        type:String,
        required:[true,'Message body is required']
    },
    image:{
        type:String
    },
    channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chaneel',
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