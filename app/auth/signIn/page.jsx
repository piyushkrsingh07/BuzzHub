'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'

import z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@/app/hooks/auth/useSignIn'
import { toast } from 'sonner'
import { useAuth } from '@/app/hooks/auth/useAuth'
import { useFetchWorkspace } from '@/app/hooks/workspaces/useFetchWorkspace'
import { useCreateWorkspaceModal } from '@/app/hooks/workspaces/useCreateWorkspaceModal'

const signInSchema=z.object({
    email:z.string().trim().min(4,{message:"Invalid email"}).max(30,{message:"Invalid email"}),

    password:z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must contain at least one number" })
  .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, { message: "Must contain at least one special character" })
})



const Signin = () => {

    const {register,
        formState:{errors,isSubmitting},
        handleSubmit,
        watch

    }=useForm({
resolver:zodResolver(signInSchema),
defaultValues:{
    email:"",

    password:"",
   
}
    })

    const router=useRouter()
    const {auth}=useAuth()

          const {isPending,isSuccess,error,signInMutation}=useSignIn()
                   const {isFetching,workspaces}=useFetchWorkspace()
  
        const {setOpenWorkspaceModal}=useCreateWorkspaceModal()

     const onSubmit=async(data)=>{
        console.log(data,'see data from signin form')

 

     await signInMutation(data)
       
     }

        useEffect(()=>{
      
      console.log(auth,'checking auth received here in signin first')
         if (!isSuccess && !auth) return

  
        console.log(auth,'checking auth received here in signin last')
           
        if(auth?.token){
 toast.success('Successfully signed in')
        }

  
        
            if(isFetching) return
            console.log('workspace downloaded is ',workspaces)
            if(workspaces?.length === 0 || !workspaces){
              console.log('no workspace found,creating one')
        // setOpenWorkspaceModal(true)
            }
            else{
              const timer=setTimeout(()=>{
         router.push(`/workspace?workspaceId=${workspaces?.data[0]?._id}`)
              },3000)
                return ()=>clearTimeout(timer)
            }
       
           
        
     
     },[isSuccess,isFetching,workspaces])
  return (
     <Card className="w-full h-full ">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Sign in to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
           
            <div className='space-y-2'>
<Input 
                id="email"
                {...register("email")}
                placeholder="Enter your email"
                className={errors.email?"border-red-500":""}
              />
              {errors.email && (
                <p className='text-xs text-red-500'>
                  {errors.email.message}
                </p>
              )

              }
            </div>
             <div className='space-y-2'>
             <Input 
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className={errors.password?"border-red-500":""}
              />
              {errors.password && (
                <p className='text-xs text-red-500'>
                  {errors.password.message}
                </p>
              )

              }
            </div>
             
            <Button
            className={`w-full`}
             type="submit"
             disabled={isSubmitting}
            >
             {
              isSubmitting || isFetching?(<>
               <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
               Submitting...
              </>):(
               "Continue"
              )
             }
            </Button>
        </form>

        <Separator className='my-5'/>

      <p className='text-sm text-muted-forground mt-4'>
        Don't have an account ? {' '}
        <span className='text-sky-600 hover:underline cursor-pointer' onClick={()=>router.push('/auth/signUp')}>Sign Up</span>
      </p>
      </CardContent>
     </Card>
  )
}

export default Signin