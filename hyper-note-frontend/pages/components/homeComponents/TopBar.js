import React from 'react'
import { FaBars } from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'

export default function TopBar({ isOpen, setOpen, selected }) {
    return (
        <div className={`${isOpen ? 'px-20' : 'px-14'} flex justify-between bg-white w-full items-center py-1 text-lg text-gray-600`}>
            <div className="flex justify-center items-center gap-x-2">
                {!isOpen && <button onClick={() => setOpen(!isOpen)}><FaBars color="#a19f9a" /></button>}
                {selected.icon !== '' ?
                    <button className="text-sm">
                            {selected.icon}
                    </button>
                    :
                    ''}
                <h1 className='text-[#a19f9a]'>{selected.heading}</h1>
            </div>
            <div className="flex justify-center items-center gap-x-2">
                <button><FiShare color="#a19f9a" /></button>
            </div>
        </div>
    )
}
