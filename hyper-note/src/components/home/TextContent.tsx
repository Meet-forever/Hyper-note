import React, { useState } from 'react'
import { getMultiContext } from '../../state_manager'
import Text from './text/Text'
const TextContent = () => {
    const { multiReducer } = getMultiContext()
    const [state, sidebardispatch] = multiReducer.sidebarList
    const [prefstate, prefDispatch] = multiReducer.preference
    const handleHeading = (e: React.ChangeEvent<HTMLInputElement>) => {
        const heading = e.target.value
        prefDispatch({ type: "UPDATE_SIDEBAR", payload: { update: { heading: heading } } })
        sidebardispatch({ type: 'UPDATE_CONTENT', payload: { id: prefstate.selected.id, update: { heading: heading }}})
        // wsc(`${e.target.scrollHeight}px`)
    }
    return (
        <div className="mx-auto w-2/3">
            
            {/* <textarea placeholder='Untitled' onChange={handleHeading} value={prefstate.selected.heading} className="w-full resize-none font-black text-4xl outline-none" style={{height: sc}} /> */}
            {/* {state?<div>{prefstate.selected.heading}</div>:<div>Untitled</div>} */}
            {/* <input className="font-black flex flex-wrap break-words w-full  whitespace-pre-wrap text-5xl outline-none" placeholder='Untitled' type="text" onChange={handleHeading} value={prefstate.selected.heading} /> */}
            <input className="font-black flex flex-wrap break-words w-full  whitespace-pre-wrap text-5xl outline-none" placeholder='Untitled' type="text" onChange={handleHeading} value={prefstate.selected.heading} />
            {/* <textarea ref={`somethign`}></textarea> */}
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