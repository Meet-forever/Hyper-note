import React from 'react'

type Props = {
    children: JSX.Element,
    handleClick: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalCover = ({handleClick, children}:Props) => {
    return (
        <div>
            <div className='fixed z-20 top-0 left-0 w-full h-screen' onClick={() => handleClick(false)}> </div>
            {children}
        </div>
    )
}

export default ModalCover