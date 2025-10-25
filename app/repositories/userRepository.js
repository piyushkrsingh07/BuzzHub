import User from "../model/user"
import crudRepository from "./crudRepository"

const userRepository={
    ...crudRepository(User),
    getByEmail:async function (email){
        const user=await User.findOne({email})
        return user
    },

    getByUsername:async function (username){
       const user=await User.findOne({username}).select('-password')
       return user
    }  
}
export default userRepository