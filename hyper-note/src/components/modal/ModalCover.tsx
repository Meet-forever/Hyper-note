import React from 'react'

type Props = {
    children: JSX.Element,
    handleClick: React.Dispatch<React.SetStateAction<boolean>>
    coordinatePos: {
        x: number,
        y: number
    }
}

const ModalCover = ({ handleClick, children, coordinatePos }: Props) => {
    if  (!coordinatePos.x || !coordinatePos.y) return (<></>)
    return (
        <div>
            <div className='fixed z-20 top-0 left-0 w-full h-screen' onClick={() => handleClick(false)}> </div>
            <div className='fixed z-30 to' style={{top: coordinatePos.y, left: coordinatePos.x}} >
                {children}
            </div>
        </div>
    )
}

export default ModalCover