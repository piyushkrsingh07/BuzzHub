import { useCurrentWorkspace } from "@/app/hooks/workspaces/useCurrentWorkspace"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"


import Link from "next/link"

const userItemsVariant=cva(
    'flex items-center gap-1.5 justify-start font-normal h-9 px-4 text-sm ',
{
    variants:{
      variant :{
        default:'text-[#f9edffcc]',
        active:'text-[#481350] bg-white/90 hover:bg-white/80'
      }
    },
    defaultVariants:'default'

  }
    
)

export const UserItem=({
    id,
    label='Member',
    image,
    variant='default'
})=>{

    const {currentWorkspace}=useCurrentWorkspace()
    console.log(currentWorkspace,'checking out ht e current workspacee')
    return (
        <Button
         className={cn(userItemsVariant({variant}))}
         variant="transparent"
         size='sm'
         asChild
        >
            <Link href={`/workspace/${currentWorkspace?.data?._id}/members/${id}`}>
               <Avatar>
                <AvatarImage src={image} className='rounded-md -mt-1'/>
                <AvatarFallback className='rounded-md bg-sky-500 text-white'>
                    {label.charAt(0).toUpperCase()}
                </AvatarFallback>
               </Avatar>
               <span className="text-sm truncate">
                {label}
               </span>
            </Link>
        </Button>
    )
}