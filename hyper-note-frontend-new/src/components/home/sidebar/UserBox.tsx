import React, { useContext } from 'react'
import { context } from '../../../state_manager/reducers/userState';
import { FaChevronLeft, FaCog, FaUserAstronaut, FaSearch, FaUsers, FaSignOutAlt } from "react-icons/fa"
import { signOut } from 'next-auth/react';

const UserBox = () => {
    const { dispatch } = useContext(context);
    return (
        <div className=' h-[20%] sm:h-[21%] bg-[#f7f6f3] overflow-y-auto hidescroll py-2'>
            <div className="flex flex-col justify-center items-start ">
                <div className="flex justify-between items-center px-4 w-full">
                    <button className='flex justify-center  items-center gap-x-3 font-semibold text-[#a19f90] hover:bg-gray-200 p-1'>
                        <FaUserAstronaut color="#a19f9a" />
                        Meet's Note
                    </button>
                    <button
                        type="button"
                        className="flex justify-center items-center hover:bg-gray-200 cursor-pointer p-1"
                        onClick={() => dispatch({ type: "CHANGE_SIDEBAR" })}
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