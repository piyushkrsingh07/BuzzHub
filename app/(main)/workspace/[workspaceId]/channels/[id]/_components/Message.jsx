import { AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import MessageRenderer from './MessageRenderer'

const Message = ({authorImage,authorName,createdAt,body}) => {
  return (
    <div className='flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100 
     group relative
    '>
      <div
      className='flex items-center gap-2'
      >
         <Button>
            <Avatar>
                <AvatarImage className='rounded-md'src={authorImage} />
                <AvatarFallback>
                    {authorName?.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
         </Button>

         <div className='flex flex-col w-full overflow-hidden'>
            <Button className='font-bold text-primary hover:underline'>
                {authorName}
            </Button>
            <span>&nbsp;&nbsp;</span>
            <Button className='text-xs text-muted-foreground hover:underline'>
                    {createdAt}
            </Button>
         </div>

         <MessageRenderer value={body}/>
          {/* any images if there are */}
      </div>

    </div>
  )
}

export default Message