import React from 'react'
import { FaChevronLeft, FaUserAstronaut, FaSearch, FaUsers, FaSignOutAlt } from "react-icons/fa"
import { signOut, useSession } from 'next-auth/react';
import { getMultiContext } from '../../../state_manager';

const UserBox = () => {
    const {multiReducer} = getMultiContext()
    const [_, prefdispatch] = multiReducer.preference
    const {data} = useSession()
    const username = data?.user?.name ?? 'Guest'
    return (
        <div className=' h-[20vh] w-full text-[0.92rem] bg-[#f7f6f3] overflow-y-auto hidescrollx py-2'>
            <div className="flex flex-col justify-center items-start ">
                <div className="flex justify-between items-center px-4 w-full">
                    <div className='flex justify-center  items-center gap-x-3 font-semibold cursor-default text-[#a19f90] p-1'>
                        <FaUserAstronaut color="#a19f9a" />
                        <span className=' inline-block capitalize'>{username}'s Note</span>
                    </div>
                    <button
                        type="button"
                        title="Hide Sidebar"
                        className="flex justify-center items-center hover:bg-gray-200 cursor-pointer p-1"
                        onClick={() => prefdispatch({type:"CHANGE_SIDEBAR"})}
                    >
                        <FaChevronLeft color="#a19f9a" />
                    </button>
                </div>
                <div className="flex justify-start font-semibold text-[#a19f90] gap-x-3 items-center p-1 pl-5 hover:bg-gray-200 w-full cursor-pointer"><FaUsers color="#a19f9a" />Groups</div>
                <button
                    className="flex justify-start font-semibold text-[#a19f90] gap-x-3 items-center p-1 pl-5 hover:bg-gray-200 w-full cursor-pointer"
                    onClick={() => signOut()}
                >
                    <FaSignOutAlt color="#a19f9a" />
                    Sign Out
                </button>
                <div className="flex justify-start font-semibold text-[#a19f90] gap-x-3 items-center p-1 pl-5 hover:bg-gray-200 w-full cursor-pointer">
                    <FaSearch color="#a19f9a" />
                    Search
                </div>
            </div>
        </div>
    )
}

export default UserBox