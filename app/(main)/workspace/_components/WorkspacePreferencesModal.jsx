'use client'
import { useDeleteWorkspace } from '@/app/hooks/workspaces/useDeleteWorkspace'
import { useWorkspacePreferencesModal } from '@/app/hooks/workspaces/useWorkspacePreferencesModal'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TrashIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const WorkspacePreferencesModal = () => {

        const router=useRouter()
        const params = useSearchParams()
            console.log(params,'see params')


            const workspaceId=params.get('workspaceId')
            console.log(workspaceId,'see workspace id ')
    const {initialValue,setInitialValue,openPreferences,setOpenPreferences}=useWorkspacePreferencesModal()

    const {deleteWorkspaceMutation}=useDeleteWorkspace()

    const handleDelete=async()=>{
       try{
       
 const reponse=await deleteWorkspaceMutation(workspaceId)
 console.log('checking out the repsonse',reponse)
   toast.success('Workspace deleted successfully')
   
       }catch(error){
        console.log('Error in deleting workspace')
toast.error('Error in deleting workspace')
       }
    }
   
  return (
   <Dialog open={openPreferences} onOpenChange={()=>setOpenPreferences(false)}>
     <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
        <DialogHeader className='p-6 border-b bg-white'>
            <DialogTitle className='text-center'>
            
                Edit Workspace
            </DialogTitle>
        </DialogHeader>

        <div className='px-4 pb-4 flex flex-col gap-y-2'>
          <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
             <div className='flex items-center justify-between'> 
               <div className='font-semibold text-sm'> 
                Workspace Name
                <p className='font-light text-sm'>
                    {initialValue}
                </p>
               </div>
               <p className='text-sm font-semibold hover:underline'>
                Edit 
               </p>
               
             </div>
          </div>
          <Button variant='destructive' onClick={handleDelete}>
            <TrashIcon /> 
            Delete Workspace
          </Button>
        </div>
     </DialogContent>
   </Dialog>
  )
}

export default WorkspacePreferencesModal