import React, { useState } from 'react'
import Image from 'next/image'
import { getMultiContext } from '../../state_manager'
import ThemeModal from '../modal/ThemeModal'
const CoverImage = () => {
    const { multiReducer } = getMultiContext()
    const [prefState, prefdispatch] = multiReducer.preference
    const [sidebarList, sidebardispatch] = multiReducer.sidebarList
    const [isCover, setCover] = useState(false)

    const handleRemove = () => {
        sidebardispatch({ type: 'UPDATE_CONTENT', payload: { id: prefState.selected.id, update: { cover: "" }, path: prefState.selected.path } })
        prefdispatch({ type: "UPDATE_SIDEBAR", payload: { update: { cover: "" } } })
    }
    return (
        <div className=''>
            <div className="h-[30vh] w-full relative">
                {/* <Image className='absolute' src="/images/themes/test2.jpg" alt="pattern" layout='fill' objectFit='cover' />  */}
                {prefState.selected.cover !== "" ? <Image className='absolute' src={prefState.selected.cover} alt="pattern" layout='fill' objectFit='cover' /> : <></>}
                <div className='flex h-full relative z-10 w-full justify-end items-end parentbox'>
                    <div className='childbox relative z-10 right-[20%] bottom-4 p-1'>
                        <button type="button" title='Change Cover' onClick={() => setCover(i => !i)} className='text-xs hover:bg-gray-100 rounded-sm font-sans text-gray-700 bg-gray-50 p-[0.4rem] '>Change Cover</button>
                        <button type="button" title='Remove Cover' onClick={handleRemove} className='text-xs hover:bg-gray-100 rounded-sm font-sans text-gray-700 bg-gray-50 p-[0.4rem] '>Remove Cover</button>
                    </div>
                </div>
                {isCover ?
                    <div onClick={() => setCover(i => !i)} className='fixed left-0 top-0 z-20 w-full h-screen'>
                        <ThemeModal />
                    </div> : <div></div>}
            </div>
        </div>
    )
}
export default CoverImage