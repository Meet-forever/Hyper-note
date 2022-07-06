import React from 'react'
import { getMultiContext } from '../../state_manager'

const TextContent = () => {
    const {multiReducer} = getMultiContext()
    const [prefstate] = multiReducer.preference
    return (
        <div className=" mx-auto w-2/3 break-words">
            <div className="font-black text-5xl">{prefstate.selected.heading}</div>
            <br/>
            <p className=''> Type here...</p>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default TextContent