'use client'
import { useFetchWorkspace } from '@/app/hooks/workspaces/useFetchWorkspace'
import { useGetWorkspaceById } from '@/app/hooks/workspaces/useGetWorkspaceByid'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const WorkspaceSwitcher = () => {

    const router=useRouter()
    const params = useSearchParams()
        console.log(params,'see params')
        const workspaceId=params.get('workspaceId')

        if(!workspaceId) return
        
            const {isFetching,workspace}=useGetWorkspaceById(workspaceId)

          const {workspaces,isFetching:isFetchingWorkspace} = useFetchWorkspace()

          console.log(workspaces,'checking out workspaces')


  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl'>
              {isFetching ? (<Loader/>):workspace?.data?.name.charAt(0).toUpperCase()}
          </Button>

        </DropdownMenuTrigger>
          <DropdownMenuContent className='ml-2'>
            <DropdownMenuItem className='cursor-pointer flex-col justify-start items-start '>
                {workspace?.data?.name}
                <span className='text-xs text-muted-foreground'>
                    Active Workspace
                </span>
            </DropdownMenuItem>
            {isFetchingWorkspace?(
                <Loader/>
            ):(
                   workspaces?.data?.map((workspace)=>{
                if(workspace._id===workspaceId){
                    return null
                }
                  return  <DropdownMenuItem key={workspace?._id}
                  onClick={()=>router.push(`/workspace?workspaceId=${workspace?._id}`)}
                  className='cursor-pointer flex-col justify-start items-start '>
                     <p>{workspace?.name}</p>
                    </DropdownMenuItem>
                  
})
            )}
          </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default WorkspaceSwitcher