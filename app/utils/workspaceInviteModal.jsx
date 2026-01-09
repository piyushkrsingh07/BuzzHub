'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CopyIcon, RefreshCcwIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { useResetJoinCode } from '../hooks/workspaces/useResetJoinCode'
import { useRouter } from 'next/navigation'

const WorkspaceInviteModal = ({openInviteModal,setOpenInviteModal,workspaceName,joinCode,workspaceId}) => {

    const handleCopy=async()=>{
      const inviteLink=`${joinCode}`
      await navigator.clipboard.writeText(inviteLink)
      toast.success('Link copied to cipboard')
    }

    const {resetJoinCodeMutation}=useResetJoinCode(workspaceId)
    const router=useRouter()

    const handleResetCode=async()=>{
        try{
        console.log('yha pahuch gye')
       const response=await resetJoinCodeMutation()
       console.log(response,'response in frontend join code')
       toast.success('Join code reset successfully')
        }

    catch(error){
        console.log('error in reseting the code',error)
    }
    }
  return (
    <div>
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite People to {workspaceName}
                    </DialogTitle>
                    <DialogDescription>
                        Use the code shown below to invite people to worksapce
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col items-center justify-center py-10 gap-y-4'>
                    <p className='font-bold text-4xl uppercase'>
                        {joinCode}
                    </p>
                    <Button size='sm' variant='ghost ' onClick={handleCopy} className='cursor-pointer'>
                       Copy Link 
                       <CopyIcon className='size-4 ml-2'/>
                    </Button>
                    <p className='text-blue-500 cursor-pointer' onClick={()=>router.push(`/workspace/join/${joinCode}`)}>
                        Redirect to join page
                    </p>
                </div>

                    <div className='flex  items-center justify-center w-full'>
             
                    <Button  variant='outline' onClick={handleResetCode} className='cursor-pointer'>
                       Reset Join Code
                       <RefreshCcwIcon className='size-4 ml-2'/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default WorkspaceInviteModal