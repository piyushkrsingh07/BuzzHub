import { signInRequest } from "@/app/auth/authConfig/SignIn";
import { useMutation } from "@tanstack/react-query";


export const useSignIn=()=>{
    const {isPending,isSuccess,error,mutateAsync:signInMutation} = useMutation({         //on calling the mutate function the use mutation is going to trigger
        mutationFn:signInRequest,
        onSuccess:(data)=>{
            console.log("Successfully signin",data)
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