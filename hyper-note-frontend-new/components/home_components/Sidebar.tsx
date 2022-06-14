import { NextComponentType } from 'next'
import React from 'react'

const Sidebar: NextComponentType = () => {
    const isOpen = true
    return (
        <div className={ !isOpen? `hidden`:` bg-pink-300 absolute h-screen w-full col-span-8 md:static sm:col-span-2 md:col-span-1 sm:static grid  grid-rows-6`}>
            <div className='row-span-1 bg-slate-400'>
                b1
            </div>
            <div className='row-span-4 bg-slate-400'>
                b2
            </div>
            <div className='row-span-1 bg-slate-400'>
                b3
            </div>
        </div>
    )
}

export default Sidebar