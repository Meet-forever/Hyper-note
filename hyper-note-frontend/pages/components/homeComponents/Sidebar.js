import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FaEllipsisH,
  FaPlus,
  FaCog,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaChevronLeft
} from 'react-icons/fa'

export default function Sidebar({ isOpen, setOpen, UD, setSelected }) {

  return (
    <>
    {isOpen?
      <div className={`absolute w-full h-screen z-10 bg-white sm:static sm:w-80 grid grid-row-3`}>
        <div className="row-span-1 w-full bg-gray-50 p-2 py-3">
          <div className="flex flex-col justify-center items-start">
            <div className="flex justify-between items-center p-1 px-5 hover:bg-gray-200 w-full">
              <div className="flex justify-center items-center gap-x-3"><FaUser color="gray" />{UD.username}</div>
              <button
                type="button"
                className="flex justify-center items-center hover:bg-gray-300 cursor-pointer p-1"
                onClick={()=>setOpen(!isOpen)}
                >
                <FaChevronLeft color="gray" />
              </button>
            </div>
            <div className="flex justify-start gap-x-3 items-center p-1 pl-5 hover:bg-gray-200 w-full cursor-pointer"><FaCog color="gray" />Settings</div>
            <div className="flex justify-start gap-x-3 items-center p-1 pl-5 hover:bg-gray-200 w-full cursor-pointer"><FaSearch color="gray" />Search</div>
          </div>
        </div>
        <div className="row-span-6 w-full bg-gray-50 overflow-auto p-2">
          <div className="">
            {UD.notes.map((data, index) => <div key={index} className="w-full justify-between items-center flex hover:bg-gray-200">
              <details className="px-4 text-slate-500 text-md cursor-pointer overflow-clip">
                <summary>
                  <div className="inline-flex justify-center items-center gap-x-1">
                    <button><Image src={data.icon !== ''? data.icon : "/images/emojis/document.png"} width="15" height='15' /></button>
                    <button className="overflow-hidden w-18 rounded-md px-2  hover:bg-gray-300" onClick={()=>setSelected(data)}>{data.heading}</button>
                  </div>
                </summary>
              </details>
              <div className="flex items-center justify-center w-1/4">
                <div className="text-xs px-1 cursor-pointer hover:bg-gray-300"><FaEllipsisH color='gray' /></div>
                <div className="text-xs px-1 cursor-pointer hover:bg-gray-300"><FaPlus color='gray' /></div>
              </div>
            </div>)}
          </div>
        </div>
        <div className="row-span-1 w-full bg-gray-50 p-2">
          <button className="w-full"><div className="flex justify-center gap-x-3 items-center hover:bg-gray-200 w-full p-2 cursor-pointer"><FaPlus color="gray" />Add Page</div></button>
        </div>
      </div>
  :''}
    </>
  )
}
