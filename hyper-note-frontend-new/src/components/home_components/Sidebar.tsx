import { NextComponentType } from 'next'
import React, { useContext } from 'react'
import { context } from '../../state_manager/reducers/userState'
import { FaChevronLeft, FaCog, FaUser, FaSearch, FaPlus, FaEllipsisH } from "react-icons/fa"

const Sidebar: NextComponentType = () => {
    const { state, dispatch } = useContext(context)
    return (
        <div className={!state.sidebar ? `hidden` : ` absolute w-full z-10 h-screen bg-white sm:static sm:w-80 md:w-72 grid grid-row-6`}>
            <div className='row-span-1 bg-[#f7f6f3]  py-3'>
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
            <div className='row-span-4 bg-[#f7f6f3] overflow-auto p-1'>
                <div className=''>
                    {state.userlist.map((data, index) => <div key={index} className="w-full justify-between items-center flex hover:bg-gray-200">
                        <details className="px-2 text-[#a19f9a] w-full text-md cursor-pointer overflow-hidden">
                            <summary className='overflow-clip'>
                                <div className="inline-flex justify-start overflow-x-clip w-4/5 items-center gap-x-1">
                                    <button className='text-sm'> {data.icon !== '' ? data.icon : "📄"} </button>
                                    <button className="hidescroll w-full flex justify-start items-center rounded-md px-1 text-md font-semibold" 
                                    onClick={()=> dispatch({type: "SET_CURRECT_PAGE", payload: {current: data} })} >
                                        {data.heading}</button>
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
            <div className='row-span-1 bg-[#f7f6f3]'>
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