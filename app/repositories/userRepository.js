import User from "../model/user.js"
import crudRepository from "./crudRepository.js"

const userRepository={
    ...crudRepository(User),
    getByEmail:async function (email){
        const user=await User.findOne({email})

        console.log(user,'dekho user find mai')
        return user
    },

    getByUsername:async function (username){
       const user=await User.findOne({username}).select('-password')
       return user
    }  
}
export default userRepository