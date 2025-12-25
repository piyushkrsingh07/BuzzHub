'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

const sideBarItemsVariants=cva(

  "flex items-center justify-start gap-1.5 font-normal h-7 px-[20px] text-sm overflow-hidden",
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


const SideBarItem = ({
    label,
    id,
    icon:Icon,
    variant
}) => {
  const params=useParams()
  console.log("deklho params",params)
  const {workspaceId}=params
  return (
 <Button
 variant='transparent'
 size='sm'
 className={cn(sideBarItemsVariants({variant}))}
 >
  <Link
  className='flex items-center gap-1.5'
  href={`/workspace/${workspaceId}/channels/${id}`}>
<Icon className='size-3.5 mr-1'/>
<span className='text-sm'> {label}</span>
  </Link>
 </Button>
  )
}

export default SideBarItem