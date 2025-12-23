'use client'
import { useWorkspacePreferencesModal } from '@/app/hooks/workspaces/useWorkspacePreferencesModal'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TrashIcon } from 'lucide-react'
import React from 'react'

const WorkspacePreferencesModal = () => {

    const {initialValue,setInitialValue,openPreferences,setOpenPreferences}=useWorkspacePreferencesModal()
   
  return (
   <Dialog open={openPreferences} onOpenChange={()=>setOpenPreferences(false)}>
     <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
        <DialogHeader className='p-6 border-b bg-white'>
            <DialogTitle className='text-center'>
                {initialValue}
                Edit Workspace
            </DialogTitle>
        </DialogHeader>

        <div className='px-4 pb-4 flex flex-col gap-y-2'>
          <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
             <div className='flex items-center justify-between'> 
               <p className='font-semibold text-sm'> 
                Workspace Name
               </p>
               <p className='text-sm font-semibold hover:underline'>
                Edit
               </p>
             </div>
          </div>
          <Button variant='destructive'>
            <TrashIcon /> 
            Delete Workspace
          </Button>
        </div>
     </DialogContent>
   </Dialog>
  )
}

export default WorkspacePreferencesModal