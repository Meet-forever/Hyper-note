import React, { useRef, useState } from 'react'




const Heading1 = ({initial}: {initial: any}) => {
    // const [state, setState] = useState(initial);
    const element = useRef(initial)

    const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // if(e.key !== "Enter"){
            //     console.log(e.currentTarget.innerText)
            // }
        // console.log(e.)
        // setState(e.currentTarget.innerText)
        // e.preventDefault()
    }
    return (
        <div onKeyDown={handleChange} suppressContentEditableWarning contentEditable className='text-3xl outline-none'>
            {element.current.content}
        </div>
    )
}

export default Heading1