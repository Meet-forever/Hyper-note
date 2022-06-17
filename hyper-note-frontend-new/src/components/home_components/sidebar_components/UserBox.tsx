import React, { useContext } from 'react'
import { context } from '../../../state_manager/reducers/userState';
import { FaChevronLeft, FaCog, FaUser, FaSearch} from "react-icons/fa"
const UserBox = () => {
    const { dispatch } = useContext(context);
    return (
        <div className=' h-[15%] bg-[#f7f6f3]  py-1'>
            <div className="flex flex-col justify-center items-start">
                <div className="flex justify-between items-center p-1 px-5 hover:bg-gray-200 w-full">
                    <div className="flex justify-center font-semibold break-words items-center gap-x-3"><FaUser color="#a19f9a" />Meet's Note</div>
                    <button
                        type="button"
                        className="flex justify-center items-center hover:bg-gray-300 cursor-pointer p-1"
                        onClick={() => dispatch({ type: "CHANGE_SIDEBAR" })}
                    >
                        <FaChevronLeft color="#a19f9a" />
                    </button>
                </div>
                <div className="flex justify-start font-semibold text-[#a19f90] gap-x-3 items-center p-1 pl-5 hover:bg-gray-200 w-full cursor-pointer"><FaCog color="#a19f9a" />Settings</div>
                <div className="flex justify-start font-semibold text-[#a19f90] gap-x-3 items-center p-1 pl-5 hover:bg-gray-200 w-full cursor-pointer"><FaSearch color="#a19f9a" />Search</div>
            </div>
        </div>
    )
}

export default UserBox