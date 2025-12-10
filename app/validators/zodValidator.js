import { StatusCodes } from "http-status-codes"
import { customErrorResponse } from "../utils/common/responseObjects.js"
import { NextResponse } from "next/server"

export const validate=async(schema,data)=>{

    try{
      console.log( await schema.parseAsync(data,'dekhna kha fail hua'))
   return  await schema.parseAsync(data)
     
    }catch(error){
        console.log('Validation error in zod validator',error, typeof error)
             console.log(error,'dekho error')
        let explanation=[];
        let errorMessage=''

         
        
      // error.errors.forEach((key)=>{
      //   explanation.push(key.path[0]+' '+key.message)
      //   errorMessage += ' : ' +key.message;
      // }) 

      return NextResponse.json(
      { status:StatusCodes.OK },
      {message:customErrorResponse({
         message:'Validation error' + errorMessage,
         explanation:explanation
      })}
      )

  
    }
   }
