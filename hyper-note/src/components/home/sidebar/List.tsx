import React, { useState } from 'react'
import { FaEllipsisH, FaPlus } from 'react-icons/fa'
import { handleModalClick } from '../../modal/modalHandler'
import { getMultiContext } from '../../../state_manager'
import { SidebarList } from '../../../state_manager/sidebarList'
import { pagecache } from '../../../utils/pagecache'

type Props = {
    data: SidebarList,
    userID: React.MutableRefObject<string>,
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>,
    setCoordinate: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>,
    children: JSX.Element
}

const List = ({ data, userID, setPopUp, setCoordinate, children }: Props) => {
    const { multiReducer } = getMultiContext()
    const [prefstate, prefdispatch] = multiReducer.preference
    const [_, sidebarlistdispatch] = multiReducer.sidebarList
    const handleCurrentPage = async () => {
        prefdispatch({ type: "SET_CURRENT_PAGE", payload: { select: data } })
        // const notes = await pagecache(data.id)
    }
    const [hoverState, setHover] =  useState(false)
    return (
        <div className={`w-[12rem] sm:w-[12rem]`} style={hoverState?{position:'relative'}:{}} onMouseEnter ={()=>setHover(true)} onMouseLeave={()=>setHover(false)} draggable="true" onDragEnter={(e) => console.log(data.heading)} >
            <div className={`w-full justify-between items-center px-1 flex`}>
                <details className={`text-[#a19f9a] text-sm w-full `}  >
                    <summary className={`pl-2 py-[0.2rem] w-full font-semibold ${data.id === prefstate.selected.ptr ? "bg-gray-200" : ""} hover:bg-gray-200 `}>
                        <div className='inline-flex justify-between w-[88%] sm:w-[91%] '>
                            <span className='flex gap-x-2 w-3/4'>
                                <button className='text-[0.8rem]'> {data.icon !== '' ? data.icon : "📄"} </button>
                                <button className='  whitespace-nowrap text-ellipsis overflow-hidden w-full text-left'
                                    onClick={handleCurrentPage} >
                                    {data.heading ? data.heading : "Untitled"}
                                </button>
                            </span>
                            <div className="flex items-center justify-center w-1/4">
                                <button
                                    onClick={(e) => {
                                        userID.current = data.id
                                        handleModalClick(e, setPopUp, setCoordinate)
                                    }}
                                    className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                                    <FaEllipsisH color='#a19f9a' />
                                </button>
                                <button
                                    onClick={() => sidebarlistdispatch({ type: "ADD_PAGE", payload: { path: data.path.concat([data.id]) } })}
                                    className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                                    <FaPlus color='#a19f9a' />
                                </button>
                            </div>
                        </div>
                    </summary>
                    <div className="pl-1 relative">
                        {children}
                    </div>
                </details>
            </div>
        </div>
    )
}

export default List

