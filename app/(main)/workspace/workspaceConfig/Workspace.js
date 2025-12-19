import axios from "@/app/config/axiosConfig"
import { useAuth } from "@/app/hooks/auth/useAuth"

export const createWorkspaceRequest =async({name,description,token})=>{

   
    
    try{
        const response=await axios.post('/api/createworkspace',{
          name,
          description, 
        },{
            headers:{
                'x-access-token':token
            }
        })
        console.log('Response in create workspace',response)
        return response.data
    }catch(error){
        console.log('Error in create workspace request',error)
        throw error.response.data
    }
}

