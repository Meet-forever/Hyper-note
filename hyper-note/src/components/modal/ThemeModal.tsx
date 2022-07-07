import React from 'react'
import Image from 'next/image'
import { getMultiContext } from '../../state_manager'

const ThemeModal = () => {
    const { multiReducer } = getMultiContext()
    const [state, sidebardispatch] = multiReducer.sidebarList
    const [selectedState, prefdispatch] = multiReducer.preference
    const handleClick = (coverimg: string) => {
        sidebardispatch({ type: 'UPDATE_COVER', payload: { id: selectedState.selected.id, cover: coverimg, path: selectedState.selected.path } })
        prefdispatch({ type: "UPDATE_SIDEBAR", payload: { update: { cover: coverimg } } })
    }
    return (
        <div className='p-1 px-2 relative top-[25%] mx-auto overflow-clip z-10 bg-[#e7e7e7] w-[40%] h-[35%]'>
            {/* <div>something</div> */}
            <div className='w-full h-full overflow-y-scroll'>
                {/* <div>Future</div> */}
                <div className='p-1 grid  grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-1 bg-[#e7e7e7]' onClick={(e) => e.stopPropagation()} >
                    {selectedState.theme_images.map((i, k) =>
                        <button key={k} onClick={() => handleClick(`/images/themes/${i}`)}>
                            <Image className="flex-1" src={`/images/themes/${i}`} width="120" height={80} />
                        </button>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default ThemeModal