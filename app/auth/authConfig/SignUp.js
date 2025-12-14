import axios from "@/app/config/axiosConfig"

export const signUpRequest=async({email,password,username})=>{
    try{
      console.log(email,password,username,"dekho final data")
       const response=await axios.post('/api/signUp',{
        email,
        password,
        username
       })
       return response.data
    }catch(error){
       throw error.response.data
    }
}