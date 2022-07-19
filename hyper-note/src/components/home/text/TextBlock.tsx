import React, { useState } from 'react'
import { FaGripVertical, FaPlus } from 'react-icons/fa'
import Heading1 from './Heading1'

interface Props {
    data: any,
    updateBlock: Function,
    addBlock: Function,
    deleteBlock: Function
}

const TextBlock = ({ data, updateBlock, addBlock, deleteBlock }: Props) => {
    const [state, setState] = useState(data)
    
    const onChangeHandler = (e:React.FormEvent<HTMLDivElement>) =>{
        setState((i: any) => ({...i, content: e.currentTarget.innerText}))
    }
    const onKeyDownHandler = (e:React.KeyboardEvent<HTMLDivElement>)=>{
        if(e.key === "Enter"){
            e.preventDefault()       
            updateBlock(data.id)
        }
    }

    
    const dataMapper = (dataObject: any) => {
        const map: { [key: string]: any } = {
            'h1': () => {
                return (<div
                    contentEditable
                    suppressContentEditableWarning
                    className='text-6xl p-1 outline-none'
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    >
                    {state.content}
                </div>)
            },
            'p': () => {
                return (<div
                    contentEditable
                    suppressContentEditableWarning
                    className=' text-base font-normal p-1 outline-none'
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    >
                    {state.content}
                </div>)
            }
        }

        return map[dataObject.tag] ?? (() => <></>)
    }

    return (
        <div>
            {dataMapper(state)()}
        </div>
    )
}

export default TextBlock