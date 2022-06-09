import React from 'react'
import { FaBars } from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'
import Image from 'next/image'

export default function TopBar({ isOpen, setOpen, selected }) {
    return (
        <div className={`${isOpen ? 'px-20' : 'px-14'} flex justify-between items-center py-1 text-lg text-gray-600`}>
            <div className="flex justify-center items-center gap-x-2">
                {!isOpen && <button onClick={() => setOpen(!isOpen)}><FaBars /></button>}
                {selected.icon !== '' ?
                    <button>
                        <Image src={selected.icon} height="15" width="15" />
                    </button>
                    :
                    ''}
                <h1>{selected.heading}</h1>
            </div>
            <div className="flex justify-center items-center gap-x-2">
                <button><FiShare /></button>
            </div>
        </div>
    )
}
