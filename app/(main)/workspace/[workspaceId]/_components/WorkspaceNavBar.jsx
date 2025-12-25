'use client'
import { useCurrentWorkspace } from "@/app/hooks/workspaces/useCurrentWorkspace"
import { useGetWorkspaceById } from "@/app/hooks/workspaces/useGetWorkspaceByid"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, Loader, LucideLoader2, SearchIcon } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const WorkspaceNavBar=()=>{

  const params=useParams()
    console.log(params,'see params')
    const {workspaceId}=params
console.log(workspaceId,'checking the workspace id')


    const {isFetching,workspace}=useGetWorkspaceById(workspaceId)
    console.log(workspace,'see workspace received')
const {setCurrentWorkspace}=useCurrentWorkspace()

useEffect(()=>{
   if(workspace){
    setCurrentWorkspace(workspace)
   }
},[workspace,setCurrentWorkspace])
   
    return (
   <nav
    className="flex items-center justify-center h-10 p-1 bg-dark " 
   >
    <div className="flex-1"></div>
     <div>
        <Button
        size='sm'
        className='mb-1 bg-accent/25 hover:bg-accent/15 w-full justify-start h-7 px-2'>
            <SearchIcon className="size-5 text-white mr-2"/>
            <span className="text-white text-xs ">
                 {isFetching ? (<Loader/>):` Search ${workspace?.data?.name}`}
             
            </span>
        </Button>
     </div>
     <div className="ml-auto flex-1 flex items-center justify-end mr-2">
          <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="transparent" size='iconsm'>
            <InfoIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className=''>Edit</p>
      </TooltipContent>
    </Tooltip>

     </div>
   </nav>
    )
} 



export default WorkspaceNavBar