'use client'
import { useAuth } from "@/app/hooks/auth/useAuth"
import { useCreateWorkspaceModal } from "@/app/hooks/workspaces/useCreateWorkspaceModal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { LogOutIcon, PencilIcon, SettingsIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const UserButton=()=>{
    const {auth,logout}=useAuth()
    const {setOpenWorkspaceModal}=useCreateWorkspaceModal()
    const router=useRouter()

  async function handleLogout(){
    console.log('handle logout triggrred')
    await logout()
    toast.success('Successfully loggedout')
    router.push('/auth/signIn')
  }   

  function handleFunction(){
   setOpenWorkspaceModal(true)
  }

    return (
        <DropdownMenu>
  <DropdownMenuTrigger className='outline-none relative'>
<Avatar className='size-10 hover:opacity-65 transition '>
            <AvatarImage src={auth?.user?.avatar}/>
            <AvatarFallback>{auth?.user?.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleFunction}>
            <PencilIcon className="size-4 mr-2 h-10" />
            Create Workspace
           </DropdownMenuItem>
           <DropdownMenuItem>
           <SettingsIcon className="size-4 mr-2 h-10"/>
           Settings
           </DropdownMenuItem>
           <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon className="size-4 mr-2 h-10" />
            Logout
           </DropdownMenuItem>
        </DropdownMenuContent>
</DropdownMenu>
        
    )
}