import React, { useState } from 'react'

const Paragraph = ({initial}: {initial: any}) => {
    const [state, setState] = useState(initial);

    return (
        <div suppressContentEditableWarning contentEditable>
            {state.content}
        </div>
    )
}

export default Paragraph