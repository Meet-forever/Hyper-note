import React, { useContext } from 'react'
import { context } from '../../state_manager/reducers/userState'

const TextContent = () => {
    const { state } = useContext(context)
    return (
        <div className=" mx-auto w-2/3 break-words">
            <div className="font-black text-5xl">{state.selected.heading}</div>
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