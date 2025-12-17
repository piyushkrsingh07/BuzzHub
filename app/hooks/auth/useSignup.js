'use client'
import { useMutation } from "@tanstack/react-query";

import { signUpRequest } from "@/app/auth/authConfig/SignUp";
import { toast } from "sonner";



export const useSignUp=()=>{
    const {isPending,isSuccess,error,mutateAsync:signupMutation} = useMutation({         //on calling the mutate function the use mutation is going to trigger
        mutationFn:signUpRequest,
        onSuccess:(data)=>{
            console.log("Successfully signup",data)
            
        },
        onError:(error)=>[
         
            toast.error(`Failed to sign up ${error?.message?.message || error?.message || "Something went wrong"}`)
        ]
    })

    return {
        isPending,
        isSuccess,
        error,
        signupMutation,
 

    }
}