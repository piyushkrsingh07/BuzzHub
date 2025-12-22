import axios from "@/app/config/axiosConfig"


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

export const fetchWorkspacesRequest = async({auth,token})=>{
    try{
        console.log("checking userId received",auth?.user?.userId)
        const response=await axios.get(`/api/getUserWorkspaces?userId=${auth?.user?.userId}`,{
            headers:{
                'x-access-token':token
            }
        })
                console.log('Response in getWorkspace',response)
        return response.data
    }catch(error){
       console.log('Error in get workspace request',error)
        throw error.response.data
    }
}

export const fetchWorkspaceDetailsRequest = async(workspaceId,token)=>{
    console.log('finally id is',workspaceId,token)
    try{
     const response=await axios.get(`/api/getWorkspacesById?workspaceId=${workspaceId}`,{
        headers:{
            'x-access-token':token
        }
     })
console.log('see workspace details by id',response)
return response.data
    }catch(error){
       console.log('Error in get workspace request',error)
        throw error.response.data
    }
}

