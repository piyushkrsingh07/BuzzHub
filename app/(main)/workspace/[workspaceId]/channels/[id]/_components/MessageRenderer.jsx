'use client'
import Quill from "quill"
import { useEffect, useRef, useState } from "react"

 const MessageRenderer=({value})=>{

    const rendererRef=useRef(null)

    const [isEmpty,setIsEmpty]=useState(false)
    useEffect(()=>{
       if(!rendererRef.current ) return

       console.log(value,'see valur')

       const quill = new Quill(document.createElement('div'),{
        theme:'snow'
       })
       
       quill.disable()
       if(value === undefined) return
       const content = JSON.parse(value)
       quill.setContents(content)

       console.log(quill.root.innerHTML,'see text')

       const isContentEmpty = quill.getText().trim().length === 0
       setIsEmpty(isContentEmpty)

       rendererRef.current.innerHTML=quill.root.innerHTML;


    },[value])

    if(isEmpty) return null;
    return (
        <div  ref={rendererRef} className="ql-editor ql-renderer"/>


    )
}

export default MessageRenderer