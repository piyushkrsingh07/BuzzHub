import userRepository from "../repositories/userRepository"

export const signUpService=async(data)=>{
    try{
        const newUser=await userRepository.create(data)
        return newUser
    }catch(error){
       console.log('User Service Error',error)
       if(error.name === 'ValidationError'){
           throw new ValidationError({
            error:error.errors //it is like an object which put all errors in place
           },
        error.message
        )
       }

       if(error.name === 'MongoServerError' && error.code === 11000){
        throw new ValidationError(
            {
                error:['A user with same email or username already exists']
            },
            'A user with same email or username already exists'
        )
       }
    }
}