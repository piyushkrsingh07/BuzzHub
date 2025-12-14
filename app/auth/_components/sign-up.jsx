import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const signUpSchema=z.object({
    email:z.string().trim().min(4,{message:"Invalid email"}).max(20,{message:"Invalid email"}),
    username:z.string().trim().min(4,{message:"Invalid username"}).max(20,{message:"Invalid username"}),
    password:z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must contain at least one number" })
  .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, { message: "Must contain at least one special character" })
})
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
    password:""
}
    })
  return (
     <Card className="w-full h-full ">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>

        </form>
      </CardContent>
     </Card>
  )
}

export default Signup