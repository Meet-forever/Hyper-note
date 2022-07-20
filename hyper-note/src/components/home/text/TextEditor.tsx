import React, { useEffect, useRef } from 'react'
import { useState } from "react"
// import usePrevious from '../../../hooks/usePrevious'
import TextBlock from './TextBlock'


const TextEditor = ({ content, onChange }: { content: any, onChange: React.Dispatch<React.SetStateAction<any>> }) => {
    const [contentState, setContentState] = useState(content.data as any[])
    // const previousState = usePrevious(contentState as any[])
    const [currentFocusedElement, setCurrentFocusedElement] = useState<string>("")

    useEffect(()=>{
        // if(previousState && previousState.length !== contentState.length){
        console.log("Update data base on the server with TimeOut")
        // }
    },[contentState])



    const dataToElementMapper = (objectArray:any[]) =>{
        return (objectArray.map((data, index)=>{
            return(<TextBlock
                    key={index} 
                    data = {data}
                    currentFocusedElement={currentFocusedElement}
                    setContentState={setContentState}    
                    setCurrentFocusedElement = {setCurrentFocusedElement}
            />)
        }))
    }

    return (
        <div>
            {dataToElementMapper(contentState)}
        </div>
    )
}

export default TextEditor