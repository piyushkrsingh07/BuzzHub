'use client'

import React, { useEffect } from 'react'
import { useCreateWorkspaceModal } from '../hooks/workspaces/useCreateWorkspaceModal'
import { Input } from '@/components/ui/input'
import { useCreateWorkspace } from '../hooks/workspaces/useCreateWorkspace'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod/v3'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'


const workspaceSchema=z.object({
   name:z.string().trim().min(4,{message:"Invalid workspace name"}).max(30,{message:"Invalid workspace name"}),

})

const CreateWorkspaceModal = () => {
const   {openWorkspaceModal,setOpenWorkspaceModal}=useCreateWorkspaceModal()
const router=useRouter()
const queryClient=useQueryClient()

const {isPending,isSuccess,createWorkspaceMutation}=useCreateWorkspace()

  const onSubmit=async(data)=>{
        console.log(data,'see data from workspace form')

     try{
const response=await createWorkspaceMutation(data)
console.log('create the workspace',response)
 queryClient.invalidateQueries({ queryKey: ['fetchWorkspaces'] })
 if(response?.data?._id){
  router.push(`/workspace/${response?.data?._id}`)
 }
     }catch(error){
      console.log('Not able to create the workspace',error)
     }finally{
    setOpenWorkspaceModal(false)
     }
      


       
     }


    const {register,
        formState:{errors,isSubmitting},
        handleSubmit,
        watch

    }=useForm({
resolver:zodResolver(workspaceSchema),
defaultValues:{
name:""
   
}
    })

function handleClose(){
  setOpenWorkspaceModal(false)
}


  return (
    <Dialog open={openWorkspaceModal} onOpenChange={handleClose}>
          <DialogContent>
             <DialogHeader>
              <DialogTitle>
                  Create a new workspace
              </DialogTitle>
             </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
           
            <div className='space-y-2'>
<Input 
                id="name"
                {...register("name")}
                placeholder="Enter your workspace name"
                className={errors.name?"border-red-500":""}
              />
              {errors.name && (
                <p className='text-xs text-red-500'>
                  {errors.name.message}
                </p>
              )

              }
            </div>
             
             
            <Button
            className={`w-full`}
             type="submit"
             disabled={isSubmitting && isPending}
            >
             {
              isSubmitting?(<>
               <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
               Submitting...
              </>):(
               "Create workspace"
              )
             }
            </Button>
        </form>
          </DialogContent>
    </Dialog>
  )
}

export default CreateWorkspaceModal