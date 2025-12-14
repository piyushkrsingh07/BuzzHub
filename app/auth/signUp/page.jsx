'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

import z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'

const signUpSchema=z.object({
    email:z.string().trim().min(4,{message:"Invalid email"}).max(30,{message:"Invalid email"}),
    username:z.string().trim().min(4,{message:"Invalid username"}).max(20,{message:"Invalid username"}),
    password:z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must contain at least one number" })
  .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, { message: "Must contain at least one special character" })
}).refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });



const Signup = () => {

    const {register,
        formState:{errors,isSubmitting},
        handleSubmit,
        watch

    }=useForm({
resolver:zodResolver(signUpSchema),
defaultValues:{
    email:"",
    username:"",
    password:"",
    confirmPassword:""
}
    })

     const router=useRouter()

     const onSubmit=async(data)=>{
        console.log(data,'see data from signup form')
     }
  return (
     <Card className="w-full h-full ">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Sign up to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <div className='space-y-2'>
              <Input 
                id="username"
                {...register("username")}
                placeholder="Enter your username"
                className={errors.username?"border-red-500":""}
              />
              {errors.username && (
                <p className='text-xs text-red-500'>
                  {errors.username.message}
                </p>
              )

              }
            </div>
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
                <div className='space-y-2'>
             <Input 
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className={errors.confirmPassword?"border-red-500":""}
              />
              {errors.confirmPassword && (
                <p className='text-xs text-red-500'>
                  {errors.confirmPassword.message}
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
              isSubmitting?(<>
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
        Already have an account ? {' '}
        <span className='text-sky-600 hover:underline cursor-pointer' onClick={()=>router.push('/auth/signIn')}>Sign In</span>
      </p>
      </CardContent>
     </Card>
  )
}

export default Signup