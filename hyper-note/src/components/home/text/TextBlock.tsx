import React, { useEffect, useRef, useState } from 'react'
import { FaGripVertical, FaPlus } from 'react-icons/fa'
import Heading1 from './Heading1'
import { v4 } from 'uuid'

interface Props {
    data: any,
    setContentState: React.Dispatch<React.SetStateAction<any[]>>,
    setCurrentFocusedElement: React.Dispatch<React.SetStateAction<string>>,
    currentFocusedElement: string
}

const TextBlock = ({ data, currentFocusedElement, setContentState, setCurrentFocusedElement }: Props) => {
    const [localState, setLocalState] = useState(data)
    const localElement = useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (localElement.current && localElement.current.innerText !== data.content) {
            localElement.current.innerText = data.content
            if (currentFocusedElement === data.id) localElement.current.focus()
        }
    }, [data])

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

    useEffect(() => {
        let update: NodeJS.Timeout
        update = setTimeout(() => {
            setContentState(i => {
                const index = i.findIndex(obj => obj.id === data.id)
                if (index === -1) return i
                i[index] = {
                    ...i[index],
                    ...localState
                }
                return [...i]
            })
        }, 2000)
        return () => {
            clearTimeout(update)
        }
    }, [localState])


    const addTextBlock = (id: string) => {
        const newid = v4()
        const defaultblock = { id: newid, tag: 'p', content: 'Enter something' }
        setContentState(i => {
            const index = i.findIndex(obj => obj.id === id)
            if (index === -1) return i
            const newState = [...i]
            newState.splice(index + 1, 0, defaultblock)
            setCurrentFocusedElement(newid)
            return newState
        })
    }
    const deleteTextBlock = (id: string) => {
        setContentState(i => {
            const index = i.findIndex(obj => obj.id === id)
            if (index === -1 || i.length === 1) return i
            const newState = [...i]
            newState.splice(index, 1)
            let target = index
            if(index-1 === newState.length-1) target -= 1;
            setCurrentFocusedElement(newState[target].id)
            return newState
        })
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTextBlock(data.id)
            return
        }
        else if (e.key === "Backspace" && localState.content === "") {
            e.preventDefault()
            deleteTextBlock(data.id)
            return
        }
    }
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setCurrentFocusedElement(data.id)
    }

    const getElement = () => {
        switch (data.tag) {
            case 'h1': {
                return (<div
                    contentEditable
                    suppressContentEditableWarning
                    ref={localElement}
                    onChange={(e) => console.log(e.currentTarget.innerText)}
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
                    data-position={data.id}
                    className="text-base font-normal outline-none"
                >
                </div>)
            }
        }
    }
    return (<div>
        {getElement()}
    </div>)
}

export default TextBlock