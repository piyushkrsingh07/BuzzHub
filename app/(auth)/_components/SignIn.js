import axios from "@/app/config/axiosConfig"

export const signInRequest=async({email,password})=>{
    try{
       const response=await axios.post('/api/signIn',{
        email,
        password,

       })
       return response.data
    }catch(error){
       throw error.response.data
    }
}