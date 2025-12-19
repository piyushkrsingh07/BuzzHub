import { signInRequest } from "@/app/auth/authConfig/SignIn";
import { useMutation } from "@tanstack/react-query";


export const useSignIn=()=>{
    const {isPending,isSuccess,error,mutateAsync:signInMutation} = useMutation({         //on calling the mutate function the use mutation is going to trigger
        mutationFn:signInRequest,
        onSuccess:(response)=>{
            console.log("Successfully signin",response)

            const userObject = JSON.stringify(response.data)
            console.log(userObject,'SEE USER OBJ')
            localStorage.setItem('user',userObject)
            console.log(response.data.token,typeof response.data.token,'seeing token')
            localStorage.setItem('token',response.data.token)
            console.log('local storage success')
            
        },
        onError:(error)=>[
            console.error('Failed to sign up')
        ]
    })

    return {
        isPending,
        isSuccess,
        error,
       signInMutation,
       
    }
}