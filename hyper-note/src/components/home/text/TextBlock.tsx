import React, { useEffect, useRef, useState } from 'react'
import { FaGripVertical, FaPlus } from 'react-icons/fa'
import { v4 } from 'uuid'

interface Props {
    data: any,
    setCaretPosition: React.Dispatch<React.SetStateAction<{
        edit: boolean;
        position: number;
    }>>,
    position_index: number;
    setContentState: React.Dispatch<React.SetStateAction<any[]>>,
    setCurrentFocusedElement: React.Dispatch<React.SetStateAction<string>>,
    currentFocusedElement: string
}

const TextBlock = ({ data,
    currentFocusedElement,
    setCaretPosition,
    setContentState,
    setCurrentFocusedElement,
    position_index }: Props) => {

    const [localState, setLocalState] = useState(data)
    const localElement = useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (localElement.current && localElement.current.innerText !== data.content) {
            localElement.current.innerText = data.content
        }
        if (currentFocusedElement === data.id) localElement.current?.focus()
    }, [data, currentFocusedElement])

    // When localElement(contentEditable div) gets updated, we will update localState to update the change in the global state
    React.useEffect(() => {
        const onInput = (event: Event) => {
            const target = event.target as HTMLElement
            setLocalState({ ...data, content: target.innerText })
        }
        localElement.current?.addEventListener('input', onInput)
        return () => {
            localElement.current?.removeEventListener('input', onInput)
        }
    }, [localElement])

    // updates global state
    useEffect(() => {
        const update = setTimeout(() => {
            setContentState(i => {
                const index = i.findIndex(obj => obj.id === data.id)
                if (index === -1) return i
                i[index] = {
                    ...i[index],
                    ...localState
                }
                return [...i]
            })
        }, 1000)
        return () => {
            clearTimeout(update)
        }
    }, [localState])


    const addTextBlock = () => {
        setContentState(i => {
            const newid = v4()
            const defaultblock = { id: newid, tag: 'p', content: "" }
            let _newContent = ""
            const selection = window.getSelection()
            if (!selection) return i
            if (selection.anchorOffset === selection.focusOffset) {
                _newContent = i[position_index].content.substr(selection.anchorOffset, i[position_index].content.length)
                i[position_index].content = i[position_index].content.slice(0, selection.anchorOffset)
                // console.log(`Move Caret: ${_newContent}`)
            } else {
                _newContent = i[position_index].content.slice(selection.focusOffset, i[position_index].content.length)
                i[position_index].content = i[position_index].content.slice(0, selection.anchorOffset)
            }
            const newstate = [...i]
            defaultblock.content = _newContent
            newstate.splice(position_index + 1, 0, defaultblock)
            setCurrentFocusedElement(newid)
            return newstate
        })
    }

    const deleteTextBlock = (id: string) => {
        setContentState(i => {
            const index = i.findIndex(obj => obj.id === id)
            if (index === -1 || i.length < 2) return i
            const newState = [...i]
            const _old_content = i[index].content
            newState.splice(index, 1)
            let target = index
            target -= 1;
            setCaretPosition({ edit: true, position: newState[target].content.length })
            newState[target].content += _old_content
            setCurrentFocusedElement(newState[target].id)
            return newState
        })
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTextBlock()
            return
        }
        else if (e.key === "Backspace" && document.getSelection()?.anchorOffset === 0) {
            e.preventDefault()
            deleteTextBlock(data.id)
            return
        }
    }

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setCurrentFocusedElement(data.id)
    }

    // Maps JSON object to HTML tag element
    const getElement = () => {
        switch (data.tag) {
            case 'h1': {
                return (<div
                    contentEditable
                    suppressContentEditableWarning
                    ref={localElement}
                    onKeyDown={onKeyDownHandler}
                    onClick={onClickHandler}
                    data-position={data.id}
                    className={`text-4xl font-black outline-none ${data.content ? "" : "text-gray-100"}`}
                >
                </div>)
            }
            case 'p': {
                return (<div
                    contentEditable
                    suppressContentEditableWarning
                    ref={localElement}
                    onKeyDown={onKeyDownHandler}
                    onClick={onClickHandler}
                    data-position={data.id}
                    className="text-base font-normal outline-none hover:bg-gray-100 w-full px-[0.4rem] py-[0.30rem]  rounded-sm"
                >
                </div>)
            }
        }
    }
    return (<div className='flex justify-start items-center parentbox relative -left-12'>
        <div className='text-[0.98rem] p-1 childbox hover:bg-gray-50'> <FaPlus size="0.9em" color="gray" /> </div>
        <div className='cursor-move text-[0.98rem] p-1 childbox hover:bg-gray-50 rounded-sm'><FaGripVertical size="0.9em" color="gray" /></div>
        <>{getElement()}</>
    </div>)
}

export default TextBlock