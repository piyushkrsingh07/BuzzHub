import { useMutation } from "@tanstack/react-query";

import { signUpRequest } from "@/app/auth/authConfig/SignUp";

export const useSignUp=()=>{
    const {isPending,isSuccess,error,mutate:signupMutation} = useMutation({         //on calling the mutate function the use mutation is going to trigger
        mutationFn:signUpRequest,
        onSuccess:(data)=>{
            console.log("Successfully signup",data)
        },
        onError:(error)=>[
            console.error('Failed to sign up')
        ]
    })

    return {
        isPending,
        isSuccess,
        error,
        signupMutation
    }
}