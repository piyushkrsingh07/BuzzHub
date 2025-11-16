import Channel from "../model/channel"
import crudRepository from "./crudRepository"


const channelRepository={

    ...crudRepository(Channel),
    getChannelWithWorkspaceDetails:async function (channelId){
        const channel=await Channel.findById(channelId).populate('workspaceId')
        return channel
    }

}

export default channelRepository