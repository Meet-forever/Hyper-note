import React, { useState } from 'react'
import Image from 'next/image'
import { getMultiContext } from '../../state_manager'
import ThemeModal from '../modal/ThemeModal'
const CoverImage = () => {
    const { multiReducer } = getMultiContext()
    const [state, _] = multiReducer.preference
    const [isCover, setCover] = useState(false)
    return (
        <div className=''>
            <div className="h-[30vh] w-full relative">
                {/* <Image className='absolute' src="/images/themes/test2.jpg" alt="pattern" layout='fill' objectFit='cover' />  */}
                {state.selected.cover !== "" ? <Image className='absolute' src={state.selected.cover} alt="pattern" layout='fill' objectFit='cover' /> : <></>}
                <div className='flex h-full relative z-10 w-full justify-end items-end parentbox'>
                    <div className='childbox relative z-10 right-[20%] bottom-4 '>
                        <button onClick={() => setCover(i => !i)} className='text-xs hover:bg-gray-100 rounded-sm font-sans text-gray-700 bg-gray-50 p-1 '>Change Cover</button>
                    </div>
                </div>
                {isCover ?
                    <div onClick={()=> setCover(i => !i)} className='fixed left-0 top-0 z-20 w-full h-screen'>
                    <ThemeModal />
                    </div> : <div></div>}
            </div>
        </div>
    )
}
export default CoverImage