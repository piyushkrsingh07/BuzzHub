import Channel from "../model/channel"
import crudRepository from "./crudRepository"


const channelRepository={

    ...crudRepository(Channel)
}

export default channelRepository