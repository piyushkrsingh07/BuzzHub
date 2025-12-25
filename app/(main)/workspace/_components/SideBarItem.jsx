import Link from 'next/link'
import React from 'react'

const SideBarItem = ({
    label,
    icon:Icon,
    variant
}) => {
  return (
 <Button
 variant='transparent'
 size='sm'
 >
  <Link>
<Icon className='size-3.5 mr-1'/>
<span className='text-sm'> {label}</span>
  </Link>
 </Button>
  )
}

export default SideBarItem