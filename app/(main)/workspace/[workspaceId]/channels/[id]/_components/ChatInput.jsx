import React from 'react'
import { Editor } from './Editor'

const ChatInput = () => {

    const handleSubmit=()=>{
        
    }
  return (
 <div
            className="px-5 w-full"
        >
            <Editor 
                placeholder="Type a message..."
                onSubmit={handleSubmit}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""
                
            />

            
        </div>
  )
}

export default ChatInput