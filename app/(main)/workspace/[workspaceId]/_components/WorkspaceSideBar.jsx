import React from 'react'
import { SideBarButton } from './SideBarButton'
import { BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react'
import { UserButton } from '@/app/home/_components/UserButton'
import WorkspaceSwitcher from './WorkspaceSwitcher'


const WorkspaceSideBar = () => {

    const routes=[
        {
            label:"Home",
            icon:HomeIcon
        },
        {
            label:'DMs',
            icon:MessageSquareIcon
        },{
            label:'Notifications',
            icon:BellIcon
        },{
            label:'More',
            icon:MoreHorizontalIcon
        }
    ]
  return (
    <div className='w-[70px] h-screen bg-[#1A2B4B] flex flex-col gap-y-4 items-center pt-[10px] pb-[5px]'>
        <WorkspaceSwitcher/>
{routes.map((route)=>(
 
  <SideBarButton 
  key={route.label}
   Icon={route.icon}
   label={route.label}
  />
    
))
}

<div className='flex flex-col items-center justify-center mt-[29rem]  gap-y-1'>
    <UserButton/>
</div>
    
         
      
      

    </div>
  )
}

export default WorkspaceSideBar