import React, { useContext } from 'react'
import { FaPlus } from "react-icons/fa"
import UserBox from './sidebar/UserBox'
import SidebarList from './sidebar/SidebarList'
import { getMultiContext } from '../../state_manager/reducers'
import { getContext } from '../../state_manager/reducers/userStates'

const Sidebar = () => {
    const {state, dispatch} = getContext();
    const {multiReducer} = getMultiContext()
    const [prefstate] = multiReducer.preference 
    return (
        <div className={!prefstate.sidebar ? `hidden ` : ` bg-white absolute z-20 h-screen sm:static sm:w-70 md:w-80 flex flex-col`}>
            <UserBox />
            <SidebarList /> 
            <div className='h-[6%] bg-[#f7f6f3]'>
                <div className='h-full w-full flex justify-end items-center flex-col'>
                    <button className="w-full" onClick={() => dispatch({ type: 'ADD_PAGE', payload: {path: []}})}>
                        <div className="flex justify-center font-semibold text-[#a19f90] gap-x-3 items-center hover:bg-gray-200 w-full p-2 cursor-pointer">
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