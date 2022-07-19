import React, { useEffect } from 'react'
import { useState } from "react"
import { v4 } from 'uuid'
import TextBlock from './TextBlock'


const TextEditor = ({ content, onChange }: { content: any, onChange: React.Dispatch<React.SetStateAction<any>> }) => {
    const [contentState, setContentState] = useState(content.data as any[])

    useEffect(()=>{
        console.log(contentState)
    },[contentState])

    const updateTextBlock = (id:string) => {
        const index = contentState.findIndex(i => i.id === id)
        if(index !== -1){
            const arr = [...contentState]
            const newid = v4()
            const defaultblock = {id: newid, tag: 'p', content: 'Enter something'}
            arr.splice(index+1, 0, defaultblock)
            arr[index] = {
                ...arr[index],
                ...defaultblock
            }
            setContentState(arr)
            // onChange(arr)
            // setContentState([...contentState])
            // console.log(contentState)
        }
    }
    const deleteTextBlock = () => {

    }
    const addTextBlock = () => {

    }

    const dataToElementMapper = (objectArray:any[]) =>{
        return (objectArray.map((data, index)=>{
            return(<TextBlock
                    key={index} 
                    data = {data}
                    addBlock = {addTextBlock}
                    updateBlock = {updateTextBlock}
                    deleteBlock = {deleteTextBlock}
            />)
        }))
    }


    return (
        <div>
            {/* {dataToElementMapper(contentState)} */}
            {contentState.map((data, index)=>(<TextBlock
                    key={index} 
                    data = {data}
                    addBlock = {addTextBlock}
                    updateBlock = {updateTextBlock}
                    deleteBlock = {deleteTextBlock}
            />))}
        </div>
    )
}

export default TextEditor