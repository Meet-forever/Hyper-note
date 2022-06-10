import React from 'react'
import {
    FaEllipsisH,
    FaPlus,
    FaCog,
    FaSearch,
    FaUser,
    FaChevronLeft
} from 'react-icons/fa'
import { UserContext } from '../../home'

export default function Sidebar({ isOpen, setOpen, UD, setSelected }) {
    const userContext = React.useContext(UserContext)
    return (
        <>
            {isOpen ?
                <div className={`absolute w-full z-10 h-screen bg-white sm:static sm:w-80 md:w-72 grid grid-row-3`}>
                    <div className="row-span-1 w-full bg-[#f7f6f3] p-2 py-3">
                        <div className="flex flex-col justify-center items-start">
                            <div className="flex justify-between items-center p-1 px-5 hover:bg-gray-200 w-full">
                                <div className="flex justify-center items-center gap-x-3"><FaUser color="#a19f9a" />{UD.username}</div>
                                <button
                                    type="button"
                                    className="flex justify-center items-center hover:bg-gray-300 cursor-pointer p-1"
                                    onClick={() => setOpen(!isOpen)}
                                >
                                    <FaChevronLeft color="#a19f9a" />
                                </button>
                            </div>
                            <div className="flex justify-start gap-x-3 items-center p-1 pl-5 hover:bg-gray-200 w-full cursor-pointer"><FaCog color="#a19f9a" />Settings</div>
                            <div className="flex justify-start gap-x-3 items-center p-1 pl-5 hover:bg-gray-200 w-full cursor-pointer"><FaSearch color="#a19f9a" />Search</div>
                        </div>
                    </div>
                    <div className="row-span-6 w-full bg-[#f7f6f3] overflow-auto p-2">
                        <div className="">
                            {UD.notes.map((data, index) => <div key={index} className="w-full justify-between items-center flex hover:bg-gray-200">
                                <details className="px-4 text-[#a19f9a] text-md cursor-pointer overflow-clip">
                                    <summary>
                                        <div className="inline-flex justify-center items-center gap-x-1">
                                            <button className='text-xs'> {data.icon !== ''? data.icon : "📄"} </button>
                                            <button className="overflow-hidden w-16 flex justify-start items-center rounded-md px-1 text-md font-semibold" onClick={() => setSelected(data)}>{data.heading}</button>
                                        </div>
                                    </summary>
                                </details>
                                <div className="flex items-center justify-center w-1/4">
                                    <div className="text-xs px-1 cursor-pointer hover:bg-gray-300"><FaEllipsisH color='#a19f9a' /></div>
                                    <div className="text-xs px-1 cursor-pointer hover:bg-gray-300"><FaPlus color='#a19f9a' /></div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div className="row-span-1 w-full bg-[#f7f6f3] p-2">
                        <div className='h-full w-full flex justify-end items-center flex-col'>
                            <button className="w-full" onClick={()=>userContext.userDispatch({type: 'ADD_PAGE'})}>
                                <div className="flex justify-center gap-x-3 items-center hover:bg-gray-200 w-full p-2 cursor-pointer">
                                    <FaPlus color="gray" />
                                    Add Page
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                : ''}
        </>
    )
}
