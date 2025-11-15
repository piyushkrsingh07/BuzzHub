

export const internalErrorResponse = (error)=>{
    return {
        success:false,
        err:error,
        data:{},
        message:'Internal Server Error'
    }
}




export const customErrorResponse=(error)=>{

    console.log(error ,'see error yha csk')
    console.log(error.message,'see error message')
    console.log(error.explanation,'see error explaination')
    if(!error.message && !error.explanation){
        console.log("check kro yha aa rha h kya")
        return internalErrorResponse(error)
    }
    return {
        success:false,
        err:error.explanation,
        data:{},
        message:error.message
    }
}

export const successResponse=(data,message)=>{
    console.log(data,'see data')
    return {
        success:true,
        message,
        data,
        err:{}
    }
}