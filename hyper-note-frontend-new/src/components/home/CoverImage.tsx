import React, { useContext } from 'react'
import Image from 'next/image'
import { context } from '../../state_manager/reducers/userState'
const CoverImage = () => {
    const { state } = useContext(context)
    return (
        <div className=''>
            <div className="h-[30vh] w-full relative">
                <Image src={state.selected.cover} alt="pattern" layout='fill' objectFit='cover' />
            </div>
            {/* <div className =" bg-red"> hello</div> */}
        </div>
    )
}
export default CoverImage