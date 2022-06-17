import React, { useContext } from 'react'
import { context } from '../../state_manager/reducers/userState'
import { FaPlus } from "react-icons/fa"
import UserBox from './sidebar_components/UserBox'
import UserList from './sidebar_components/UserList'

const Sidebar = () => {
    const { state, dispatch } = useContext(context)
    return (
        <div className={!state.sidebar ? `hidden ` : ` absolute z-20 h-screen sm:static sm:max-w-[20rem] md:max-w-[18rem] flex flex-col`}>
            <UserBox />
            <UserList /> 
            <div className='h-[5%] bg-[#f7f6f3]'>
                <div className='h-full w-full flex justify-end items-center flex-col'>
                    <button className="w-full" onClick={() => dispatch({ type: 'ADD_PAGE'})}>
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