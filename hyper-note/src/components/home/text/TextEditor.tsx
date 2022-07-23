import axios from 'axios'
import { getSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useState } from "react"
import { getMultiContext } from '../../../state_manager'
import { Page } from '../../../state_manager/page'
import TextBlock from './TextBlock'


const TextEditor = ({ page, currentPageId }: { page: Page, currentPageId: any }) => {
    const [contentState, setContentState] = useState(page.data)
    const [caretPosition, setCaretPosition] = useState({ edit: false, position: 0 })
    const [currentFocusedElement, setCurrentFocusedElement] = useState<string>("")
    const [previousKey, setPreviousKey] = useState({key: "", content: ""})
    useEffect(()=>{
        setContentState(page.data)
    }, [page])
    useEffect(() => {
        if (caretPosition.edit) {
            const element = document.querySelector(`[data-position="${currentFocusedElement}"]`) as HTMLElement
            const text = element?.firstChild ?? element
            if (text && element) {
                const caret = caretPosition.position
                const range = document.createRange()
                range.setStart(text, caret)
                range.setEnd(text, caret)
                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
            }
            setCaretPosition({ edit: false, position: 0 })
        }
        let update: NodeJS.Timeout
        if(contentState.length !== 0){
            update = setTimeout(async() => {
                const session = await getSession()
                await axios.post("/api/updatepage", {
                    ptr: currentPageId,
                    notes: {lastupdate: new Date().toLocaleString(), data: contentState},
                    provider: session?.provider
                })
            }, 3000)
        }
        return () => {
            clearTimeout(update)
        }
    }, [contentState])

    const dataToElementMapper = (objectArray: any[]) => {
        return (objectArray.map((data, index) => {
            return (<TextBlock
                key={index}
                data={data}
                position_index={index}
                previousKeyAndContent = {previousKey}
                setPreviousKeyAndContent = {setPreviousKey}
                currentFocusedElement={currentFocusedElement}
                setContentState={setContentState}
                setCaretPosition={setCaretPosition}
                setCurrentFocusedElement={setCurrentFocusedElement}
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