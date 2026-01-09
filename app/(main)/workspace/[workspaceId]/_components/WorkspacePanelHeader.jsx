'use client'
import { useAuth } from '@/app/hooks/auth/useAuth'
import { useWorkspacePreferencesModal } from '@/app/hooks/workspaces/useWorkspacePreferencesModal'
import WorkspaceInviteModal from '@/app/utils/workspaceInviteModal'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'


import { ChevronDown, ListFilterIcon, SquarePenIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const WorkspacePanelHeader = ({workspace}) => {

  const {openPreferences,setOpenPreferences,setInitialValue,setWorkspace}=useWorkspacePreferencesModal()
  const [openInviteModal,setOpenInviteModal]=useState(false)

     const {auth}=useAuth()
  
    const workspaceMembers=workspace?.data?.members

    console.log(workspaceMembers,'see workspace meber')


    const isLoggedInUserAdminOfWorkspace=workspaceMembers?.find((member)=>member.memberId._id === auth?.user?.userId && member?.role === 'admin')
   
    console.log(isLoggedInUserAdminOfWorkspace,'checking value final',auth)
  return (
    <>
   <WorkspaceInviteModal
    openInviteModal={openInviteModal}
    setOpenInviteModal={setOpenInviteModal}
    workspaceName={workspace?.data?.name}
    joinCode={workspace?.data?.joinCode}
   />
    <div className='flex items-center justify-between px-4 h-[50px] gap-0.5'>
       <DropdownMenu>
          <DropdownMenuTrigger asChild>
<Button 
              variant='transparent'
              className='font-semibold text-lg w-auto p-1.5 overflow-hidden'
              >
                <span className='truncate'>
                    {workspace?.data?.name}
                </span>
                <ChevronDown className='size-5 ml-1' />
              </Button>
          </DropdownMenuTrigger>
              
      <DropdownMenuContent side='bottom' align='start' className='w-64'>
        <DropdownMenuItem>
            <div className='size-9 relative overflow-hidden text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2 bg-[#616061]'>
                 {workspace?.data?.name.charAt(0).toUpperCase()}
            </div>
            <div className='flex flex-col items-start'>
             <p className='font-bold'>
                {workspace?.data?.name}
             </p>
             <p className='text-xs text-muted-foreground'> 
                Active Workspace
             </p>
            </div>
        </DropdownMenuItem>

        {isLoggedInUserAdminOfWorkspace && (
            <>
            <DropdownMenuItem 
            className='cursor-pointer py-2'
            onClick={()=>{
              setOpenPreferences(true)
              setInitialValue(workspace?.data?.name)
              setWorkspace(workspace)
            }
          }
            >
                Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer py-2' onClick={()=>setOpenInviteModal(true)}>
              Invite people to {workspace?.data?.name} 
            </DropdownMenuItem>
            </>
        )

        }
      </DropdownMenuContent>
       </DropdownMenu>
       <div className='flex items-center gap-7'>
        <Tooltip>
      <TooltipTrigger asChild>
           <Button variant='transparent' size='iconSm'>
           <ListFilterIcon className='size-5'/>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className=''>Filters</p>
      </TooltipContent>
    </Tooltip>
  <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='transparent' size='iconSm'>
           <SquarePenIcon className='size-5'/>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className=''>Edit</p>
      </TooltipContent>
    </Tooltip>


       </div>

    </div>
    </>
  )
}

export default WorkspacePanelHeader