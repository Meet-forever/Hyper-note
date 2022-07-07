import React from 'react'
import { getMultiContext } from '../../state_manager'

const TextContent = () => {
    const {multiReducer} = getMultiContext()
    const [prefstate, prefDispatch] = multiReducer.preference
    const handleHeading = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const heading = e.target.value
        prefDispatch({type: "UPDATE_SIDEBAR", payload: {update: {heading: heading}}})
    }
    return (
        <div className="mx-auto w-2/3 break-words">
            <input className="font-black text-5xl outline-none w-full" placeholder='Untitled' type="text" onChange={handleHeading} value={prefstate.selected.heading} />
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