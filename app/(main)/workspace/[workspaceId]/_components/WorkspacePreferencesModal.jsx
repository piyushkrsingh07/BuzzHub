'use client'
import { useCreateWorkspaceModal } from '@/app/hooks/workspaces/useCreateWorkspaceModal'
import { useDeleteWorkspace } from '@/app/hooks/workspaces/useDeleteWorkspace'
import { useFetchWorkspace } from '@/app/hooks/workspaces/useFetchWorkspace'
import { useUpdateWorkspace } from '@/app/hooks/workspaces/useUpdateWorkspace'
import { useWorkspacePreferencesModal } from '@/app/hooks/workspaces/useWorkspacePreferencesModal'
import { useConfirm } from '@/app/utils/useConfirm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const WorkspacePreferencesModal = () => {


  const queryClient=useQueryClient()
        const router=useRouter()
  const params=useParams()
    console.log(params,'see params')
    const {workspaceId}=params
            console.log(workspaceId,'see workspace id ')
    const {initialValue,setInitialValue,openPreferences,setOpenPreferences,workspace}=useWorkspacePreferencesModal()
    const {isPending,isSuccess,error,UpdateWorkspaceMutation}=useUpdateWorkspace(workspaceId)
console.log('see inital ',initialValue)

    const {deleteWorkspaceMutation}=useDeleteWorkspace()
            const {setOpenWorkspaceModal}=useCreateWorkspaceModal()
     const [editOpen,setEditOpen]=useState(false)
     const [renameValue,setRenameValue]=useState(null)

        const {isFetching,workspaces}=useFetchWorkspace()

        const {confirmation,ConfirmDialog}=useConfirm({title:'Do you want to delete the workspace',message:'This action cannot be undone'})



console.log('see workspace here',workspaces)

    const handleDelete=async()=>{
       try{
       //execution should stop here
       const ok= await confirmation()
       if(!ok){
        return null
       }
 const response=await deleteWorkspaceMutation(workspaceId)
 console.log('checking out the repsonse',response)

queryClient.invalidateQueries({ queryKey: ['fetchWorkspaces'] })

 setOpenPreferences(false)
   toast.success('Workspace deleted successfully')
   console.log('see workspace here',workspaces)
    const timer=setTimeout(()=>{
         router.push(`/workspace/${workspaces?.data[0]?._id}`)
              },3000)


  return ()=>clearTimeout(timer)
       }catch(error){
        console.log('Error in deleting workspace',error)
toast.error('Error in deleting workspace')
       }
    }

    const handleFormSubmit=async(e)=>{
      e.preventDefault()
   

      try{
        console.log(workspace,'see received workspace')
await UpdateWorkspaceMutation(renameValue)
queryClient.invalidateQueries(`fetchWorkspaceById-${workspace?.data?._id}`)
   setEditOpen(false)
    setOpenPreferences(false)
   toast.success('workspace successfully updated')
      }catch(error){
                console.log('Error in updating workspace')
toast.error('Error in updating workspace')
      }
    }
   
    useEffect(()=>{
       setRenameValue(initialValue)
    },[initialValue])

    useEffect(()=>{
     if(workspaces?.data?.length === 0){
  setOpenWorkspaceModal(true)
  
 }
    },[workspaces])
  return (
    <>
    <ConfirmDialog/>
   <Dialog open={openPreferences} onOpenChange={()=>setOpenPreferences(false)}>
     <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
        <DialogHeader className='p-6 border-b bg-white'>
            <DialogTitle className='text-center'>
            
                Edit Workspace
            </DialogTitle>
        </DialogHeader>

        <div className='px-4 pb-4 flex flex-col gap-y-2'>
         <Dialog open={editOpen} onOpenChange={()=>setEditOpen(prev=>!prev)}>
            <DialogTrigger>
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
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                <DialogTitle>
                  Rename workspace
                </DialogTitle>
               </DialogHeader>

               <form className='space-y-4' onSubmit={handleFormSubmit}>
                  <Input 
                  value={renameValue}
                   onChange={(e)=>setRenameValue(e.target.value)}
                   required
                   autoFocus
                   minLength={3}
                   maxLength={50}
                   placeholder='enter new workspace name'
                   disabled={isPending}
                  />
             

               <DialogFooter>
                  <DialogClose className='flex gap-x-2'>
                    <Button 
                    variant='outline'
                    disabled={isPending}
                    >
                      Cancel
                    </Button>
                    <Button 
                     type='submit'
                     disabled={isPending}
                    >
                      Save
                    </Button>
                  </DialogClose>
               </DialogFooter>
                 </form>
            </DialogContent>
         </Dialog>
          <Button variant='destructive' onClick={handleDelete}>
            <TrashIcon /> 
            Delete Workspace
          </Button>
        </div>
     </DialogContent>
   </Dialog>
   </>
  )
}

export default WorkspacePreferencesModal