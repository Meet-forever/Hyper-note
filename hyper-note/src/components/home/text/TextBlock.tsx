import React, { useEffect, useRef, useState } from 'react'
import { FaGripVertical, FaPlus } from 'react-icons/fa'
import { v4 } from 'uuid'
import { getMultiContext } from '../../../state_manager';

interface Props {
    data: any,
    setCaretPosition: React.Dispatch<React.SetStateAction<{
        edit: boolean;
        position: number;
    }>>,
    position_index: number;
    setContentState: React.Dispatch<React.SetStateAction<any[]>>,
    setCurrentFocusedElement: React.Dispatch<React.SetStateAction<string>>,
    currentFocusedElement: string,
    popUp: boolean,
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>,
    record: React.MutableRefObject<{
        previousKey: boolean;
        content: string;
    }>,
    setClientPosition: React.Dispatch<React.SetStateAction<{
        clientX: number;
        clientY: number;
    }>>
}

const TRIGGER = "/"

const TextBlock = ({ data,
    currentFocusedElement,
    setCaretPosition,
    setContentState,
    setCurrentFocusedElement,
    position_index,
    popUp,
    setPopUp,
    record,
    setClientPosition }: Props) => {

    const [localState, setLocalState] = useState(data)
    const localElement = useRef<HTMLDivElement>(null)
    const { multiReducer } = getMultiContext()
    const [__prefState, dispatchPref] = multiReducer.preference

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
        setContentState(i => {
            i[position_index] = {
                ...i[position_index],
                ...localState
            }
            return [...i]
        })
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

    const deleteTextBlock = () => {
        setContentState(i => {
            if (i.length < 2) return i
            const newState = [...i]
            const _old_content = i[position_index].content
            newState.splice(position_index, 1)
            let target = position_index
            target -= 1;
            setCaretPosition({ edit: true, position: newState[target].content.length })
            newState[target].content += _old_content
            setCurrentFocusedElement(newState[target].id)
            return newState
        })
    }

    const moveCursorUp = () => {
        if (!popUp) {
            setContentState(i => {
                if(position_index > 0) setCurrentFocusedElement(i[position_index - 1].id)
                return i
            })
        }// if (popUp) {
        //     setPopUp(false)
        //     dispatchPref({ type: "SCROLL_ON" })
        // }
        // if (position_index >= 1 && document.getSelection()?.anchorOffset === 0) {
        //     setContentState(i => {
        //         setCurrentFocusedElement(i[position_index - 1].id)
        //         return i
        //     })
        // }
    }

    const moveCursorDown = () => {
        if (!popUp) {
            setContentState(i => {
                if (position_index < i.length - 1) {
                    setCurrentFocusedElement(i[position_index + 1].id)
                }
                return i
            })
        }
        // if (popUp) {
        //     setPopUp(false)
        //     dispatchPref({ type: "SCROLL_ON" })
        // }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key.match(/(Shift)|(ArrowLeft)|(ArrowRight)|(Alt)/g)) return
        if (e.key === "Enter") {
            e.preventDefault()
            addTextBlock()
            return
        }
        else if (e.key === "Backspace" && document.getSelection()?.anchorOffset === 0) {
            e.preventDefault()
            deleteTextBlock()
            return
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault()
            moveCursorUp()
            return
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault()
            moveCursorDown()
            return
        }
        else if (e.key === TRIGGER) {
            const range = window.getSelection()?.getRangeAt(0)
            const Coordinates = range?.getClientRects()[0]
            if (Coordinates) {
                setClientPosition({
                    clientX: Coordinates.x + 4,
                    clientY: Coordinates.y
                })
            } else {
                setClientPosition({
                    clientX: localElement.current?.getClientRects()[0].x ?? 0,
                    clientY: localElement.current?.getClientRects()[0].y ?? 0
                })
            }
            record.current = { previousKey: true, content: "" }
            setPopUp(true)
            dispatchPref({ type: "SCROLL_OFF" })
            return
        }
        if (record.current.previousKey) {
            if (e.key.match(/(Tab)|(\s)/g)) {
                setPopUp(false)
                dispatchPref({ type: "SCROLL_ON" })
                record.current = { previousKey: false, content: "" }
            }
            else if (e.key === "Backspace") {
                if (record.current.content.length === 0) {
                    setPopUp(false)
                    dispatchPref({ type: "SCROLL_ON" })
                    record.current = { previousKey: false, content: "" }
                    return
                }
                record.current.content = record.current.content.slice(0, record.current.content.length - 1)
            }
            else if (record.current.content.length >= 5) {
                setPopUp(false)
                dispatchPref({ type: "SCROLL_ON" })
                record.current = { previousKey: false, content: "" }
            }
            else {
                record.current.content += e.key
            }
        }
    }

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (popUp) {
            setPopUp(false)
            dispatchPref({ type: "SCROLL_ON" })
        }
        setCurrentFocusedElement(data.id)
    }
    // Maps JSON object to HTML tag element
    const getElement = () => {
        switch (data.tag) {
            case 'h1': {
                return (<div
                    contentEditable
                    placeholder='Click'
                    suppressContentEditableWarning
                    ref={localElement}
                    onKeyDown={onKeyDownHandler}
                    onClick={onClickHandler}
                    data-position={data.id}
                    className={`text-4xl font-black outline-none ${data.id === currentFocusedElement ? "bg-gray-100" : "hover:bg-gray-100"} `}
                >
                    {(data.id === currentFocusedElement && data.content === "") ? "Type '/'  for options" : null}
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
                    className={`text-base font-normal outline-none ${data.id === currentFocusedElement ? "bg-gray-100" : "hover:bg-gray-100"} w-full px-[0.4rem] py-[0.30rem] rounded-sm`}
                >
                </div>)
            }
        }
    }
    return (<div className='flex justify-start items-center parentbox relative -left-12 m-1' onClick={() => popUp ? setPopUp(false) : null}>
        <div className='text-[0.98rem] p-1 childbox hover:bg-gray-50'> <FaPlus size="0.9em" color="gray" /> </div>
        <div className='cursor-move text-[0.98rem] p-1 childbox hover:bg-gray-50 rounded-sm'><FaGripVertical size="0.9em" color="gray" /></div>
        <>{getElement()}</>
    </div>)
}

export default React.memo(TextBlock)