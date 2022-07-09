import React, { useRef } from 'react'
import { useState } from "react"
import { FaGripVertical, FaPlus } from 'react-icons/fa'

const content = [{
    id: 'a',
    type: 'h1',
    content: 'this works'
},
{
    id: 'b',
    type: 'h2',
    content: 'this also works'
}]

const parser = (ar: any[]) => {
    return ar.map(i => {
        switch (i.type) {
            case 'h1': {
                return [<h1  onClick={() => console.log(window.getSelection())} onBeforeInput={(e) => e.preventDefault()} onKeyDown={(e) => console.log(e.key)} className='outline-none text-4xl break-words whitespace-pre-wrap'>{i.content}</h1>, i.id]
            }
            case 'h2': {
                return [<h2  onClick={() => console.log(`I got selected: ${i.id}`)} onBeforeInput={(e) => e.preventDefault()} onKeyDown={(e) => console.log(e.key)} className='outline-none'>{i.content}</h2>, i.id]
            }
            default: return
        }
    })
}

const Text = () => {
    const [dragState, setDragState] = useState(content)
    const curDragItem = useRef<any>(null)
    const dragEnterItem = useRef<any>(null)

    const handleDragEvent = () => {
        let _notelist = [...dragState]
        const curIndex = _notelist.findIndex(i => i.id === curDragItem.current)
        const dragEnterIndex = _notelist.findIndex(i => i.id === dragEnterItem.current)
        const temp = _notelist[curIndex]
        _notelist[curIndex] = _notelist[dragEnterIndex]
        _notelist[dragEnterIndex] = temp
        setDragState(_notelist)
    }

    return (
        <div>
            {parser(dragState).map((i, k) =>
                i ? <div draggable="true"
                    onDragStart={() => curDragItem.current = i[1]}
                    onDragEnter={() => dragEnterItem.current = i[1]}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnd={handleDragEvent}
                    className='flex justify-start items-center parentbox relative -left-12 p-2'
                    key={k} >
                    <div className='text-[0.98rem] p-1 childbox'> <FaPlus color="gray" /> </div>
                    <div className='cursor-move text-[0.98rem] p-1 childbox bg-gray-50 rounded-sm'><FaGripVertical color="gray" /></div>
                    {i[0]}
                </div>
                    :
                    null
            )}
        </div>
    )
}

export default Text