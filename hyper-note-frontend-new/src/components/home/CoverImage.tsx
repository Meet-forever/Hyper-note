import React, { useContext } from 'react'
import Image from 'next/image'
import { context } from '../../state_manager/reducers/userState'
import { getContext } from '../../state_manager/reducers/userStates'
const CoverImage = () => {
    const { state } = getContext()
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