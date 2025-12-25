'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCreateChannelModal } from "../hooks/channel/useCreateChannelModal"

import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const channelSchema=z.object({
   channelName:z.string().trim().min(4,{message:"Invalid workspace name"}).max(30,{message:"Invalid workspace name"}),

})

export const CreateChannelModal=()=>{
    const {openCreateChannelModal,setOpenCreateChannelModal}=useCreateChannelModal()

    function handleClose(){
        setOpenCreateChannelModal(false)
    }

    const {register,
        formState:{errors,isSubmitting},
        handleSubmit,
        watch

    }=useForm({
resolver:zodResolver(channelSchema),
defaultValues:{
channelName:""
   
}


    })
    const onSubmit=()=>{

    }
    return(
        <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
        <DialogContent>
           <DialogHeader>
            
              <DialogTitle>
                 Create a channel
              </DialogTitle>
           </DialogHeader>
               <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
           
            <div className='space-y-2'>
<Input 
                id="channelName"
                {...register("channelName")}
                placeholder="Enter your channel name"
                className={errors.channelName?"border-red-500":""}
              />
              {errors.channelName && (
                <p className='text-xs text-red-500'>
                  {errors.channelName.message}
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
               "Create Channel"
              )
             }
            </Button>
        </form>

        </DialogContent>
        </Dialog>
    )
}