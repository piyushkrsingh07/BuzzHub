import { StatusCodes } from "http-status-codes"
import userRepository from "../repositories/userRepository.js"
import ClientError from "../utils/errors/clientErrors.js"
import bcrypt from 'bcrypt'
import { createJWT } from "../utils/common/authUtils.js"
import ValidationError from "../utils/errors/validationError.js"
export const signUpService=async(data)=>{
    try{
        const newUser=await userRepository.create(data)
        console.log(newUser,'dekho new user')
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
       throw error 
    }
}

export const signInService=async(data)=>{
    try{
const user=await userRepository.getByEmail(data.email)
    if(!user){
       throw new ClientError ({
        explaination:'Invalid data sent from the client',
        message:'No registered user found for this email',
        statusCode:StatusCodes.NOT_FOUND
       })
    }

       const isMatch=bcrypt.compareSync(data.password,user.password)

       if(!isMatch){
        throw new ClientError({
            explaination:'Invalid data sent from the client',
            message:'Invalid password please try again',
            statusCode:StatusCodes.BAD_REQUEST
        })
       }

       // match the incoming password with the hashed password
         return {
            userId:user._id,
            username:user.username,
            avatar:user.avatar,
            email:user.email,
            token:createJWT({id:user._id,email:user.email})
         }


       
     }
    catch(error){
       console.log('User service error',error)
       throw error;
    }
}

