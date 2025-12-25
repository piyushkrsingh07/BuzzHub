'use client'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

const SideBarItem = ({
    label,
    icon:Icon,
    variant
}) => {
  const params=useParams()
  console.log("deklho params",params)
  return (
 <Button
 variant='transparent'
 size='sm'
 >
  <Link href='/'>
<Icon className='size-3.5 mr-1'/>
<span className='text-sm'> {label}</span>
  </Link>
 </Button>
  )
}

export default SideBarItem