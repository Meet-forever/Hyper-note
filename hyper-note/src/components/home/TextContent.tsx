import React, { useState } from 'react'
import { getMultiContext } from '../../state_manager'
import Text from './text/Text'
const TextContent = () => {
    const { multiReducer } = getMultiContext()
    const [state, sidebardispatch] = multiReducer.sidebarList
    const [prefstate, prefDispatch] = multiReducer.preference
    const handleHeading = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const heading = e.target.value
        prefDispatch({ type: "UPDATE_SIDEBAR", payload: { update: { heading: heading } } })
        sidebardispatch({ type: 'UPDATE_CONTENT', payload: { id: prefstate.selected.id, update: { heading: heading }, path: prefstate.selected.path } })
    }
    return (
        <div className="mx-auto w-2/3 break-words">
            <textarea className="resize-none font-black text-5xl outline-none w-full" placeholder='Untitled' onChange={handleHeading} value={prefstate.selected.heading} />
            <br />
            <Text />      
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default TextContent