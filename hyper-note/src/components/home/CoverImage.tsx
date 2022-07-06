import React from 'react'
import Image from 'next/image'
import { getMultiContext } from '../../state_manager'
const CoverImage = () => {
    const {multiReducer} = getMultiContext()
    const [state,_]= multiReducer.preference
    return (
        <div className=''>
            <div className="h-[30vh] w-full relative">
                <Image className='absolute' src="/images/themes/test2.jpg" alt="pattern" layout='fill' objectFit='cover' /> 
                {state.selected.cover !== ""? <Image className='absolute' src={state.selected.cover} alt="pattern" layout='fill' objectFit='cover' />: <></>}
                <div className='z-20 relative'>lol</div>
            </div>
        </div>
    )
}
export default CoverImage