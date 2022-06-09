import React from 'react'
import CoverImage from './CoverImage'
import TextContent from './TextContent';
import Image from 'next/image'
import TopBar from './TopBar'
import {FaPlus} from 'react-icons/fa'

export default function UserPage({isOpen, setOpen, selected, setSelected}) {
    return (
        Object.keys(selected).length !== 0?(
        <div className="h-screen text-2xl font-semibold w-full">
            <TopBar isOpen={isOpen} setOpen={setOpen} selected={selected}/>
            {selected.cover !== ''?<CoverImage selected={selected} />:<div className="h-[20vh]"></div>}
            <span className="relative -top-10 left-20">
                {selected.icon !== '' ?
                <button><Image src={selected.icon} width="80" height="80"  objectFit="contain"/></button>
                :
                <button><div className="opacity-0 hover:opacity-60 rounded-md fixed w-12 h-14 hover:bg-gray-200 flex justify-center items-center">
                    <FaPlus color="gray" />
                </div></button>}
            </span>
            <TextContent selected={selected} setSelected={setSelected} />
        </div>): <></>
    )
}
