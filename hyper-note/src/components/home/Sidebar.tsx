import React from 'react'
import { FaPlus } from "react-icons/fa"
import UserBox from './sidebar/UserBox'
import SidebarList from './sidebar/SidebarList'
import { getMultiContext } from '../../state_manager'

const Sidebar = () => {
    const {multiReducer} = getMultiContext()
    const [prefstate] = multiReducer.preference
    const [_, sidebarlistDispatch] = multiReducer.sidebarList
    return (
        <div className={!prefstate.sidebar ? `hidden ` : ` bg-white absolute z-20 h-screen sm:static w-52 sm:w-72 overflow-hidden flex flex-col`}>
            <UserBox />
            <SidebarList />
            <div className='h-[6%] bg-[#f7f6f3] w-full'>
                <div className='h-full w-full flex justify-end items-center flex-col'>
                    <button className="w-full" onClick={() => sidebarlistDispatch({ type: 'ADD_PAGE', payload: {path: [], position: false}})}>
                        <div className="flex justify-center text-[0.92rem] font-semibold text-[#a19f90] gap-x-3 items-center hover:bg-gray-200 w-full p-2 cursor-pointer">
                            <FaPlus color="gray" />
                            Add Page
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar