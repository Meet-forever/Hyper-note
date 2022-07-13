import React, { useState } from 'react'
import { FaCaretDown, FaCaretRight, FaEllipsisH, FaPlus } from 'react-icons/fa'
import { handleModalClick } from '../../modal/modalHandler'
import { getMultiContext } from '../../../state_manager'
import { SidebarList } from '../../../state_manager/sidebarList'
import { pagecache } from '../../../utils/pagecache'

type Props = {
    data: SidebarList,
    userID: React.MutableRefObject<undefined[] | [string, string[]]>,
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>,
    setCoordinate: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>,
    children: JSX.Element,
    padding: number
}

const List = ({ data, userID, setPopUp, setCoordinate, children, padding }: Props) => {
    const { multiReducer } = getMultiContext()
    const [prefstate, prefdispatch] = multiReducer.preference
    const [_, sidebarlistdispatch] = multiReducer.sidebarList
    const handleCurrentPage = async () => {
        prefdispatch({ type: "SET_CURRENT_PAGE", payload: { select: data } })
        // const notes = await pagecache(data.id)
    }
    const [toggle, setToggle] = useState(false)
    const [isHover, setHover] = useState(false)
    return (
        <div className='w-full'>
            <div className='flex flex-col w-full'>
                <div className={`cursor-pointer gap-x-[0.1rem] flex justify-start items-center w-full font-semibold text-sm text-[#a19f9a]  py-[0.2rem] ${data.id === prefstate.selected.id ? "bg-gray-200" : ""} hover:bg-gray-200 rounded-sm pr-2 `} style={{paddingLeft: `${padding - 0.5}rem` }}
                    onMouseEnter={()=>setHover(true)}
                    onMouseLeave={()=>setHover(false)}
                    draggable = "true"
                >
                    <button type="button" title="Collapse or Expand" className='text-[0.9rem] p-[0.1rem] rounded-sm hover:bg-gray-300' onClick={()=>setToggle(i=> !i)}>{toggle?<FaCaretDown />:<FaCaretRight />}</button>
                    <div className='text-[0.8rem] p-[0.05rem]'>{data.icon}</div>
                    <div onClick={handleCurrentPage} className='whitespace-nowrap text-ellipsis overflow-hidden w-full'>{data.heading}</div>
                    {isHover?<div className='flex'>
                        <button
                            type="button"
                            title="Option Box"
                            onClick={(e) => {
                                userID.current = [data.id, data.path]
                                handleModalClick(e, setPopUp, setCoordinate)
                            }}
                            className='text-[0.7rem] p-1 rounded-sm hover:bg-gray-300'
                        >
                            <FaEllipsisH />
                        </button>
                        <button
                            type="button"
                            title='Add Page Inside'
                            onClick={() => sidebarlistdispatch({ type: "ADD_PAGE", payload: { path: data.path.concat([data.id]) } })}
                            className='text-[0.7rem] p-1 rounded-ms hover:bg-gray-300'
                        >
                            <FaPlus />
                        </button>
                    </div>:null}
                </div>
                {toggle?children:null}
            </div>
        </div>
    )
}

export default List


    // <div className='w-[12rem] sm:w-[12rem]'>
    //     <div className={`w-full justify-between items-center px-1 flex`}>
    //         <details className={`text-[#a19f9a] text-sm w-full `}  >
    //             <summary className={`pl-2 py-[0.2rem] w-full font-semibold ${data.id === prefstate.selected.ptr ? "bg-gray-200" : ""} hover:bg-gray-200 `}>
    //                 <div className='inline-flex justify-between w-[88%] sm:w-[91%] '>
    //                     <span className='flex gap-x-2 w-3/4'>
    //                         <button className='text-[0.8rem]'> {data.icon !== '' ? data.icon : "📄"} </button>
    //                         <button className='  whitespace-nowrap text-ellipsis overflow-hidden w-full text-left'
    //                             onClick={handleCurrentPage} >
    //                             {data.heading ? data.heading : "Untitled"}
    //                         </button>
    //                     </span>
    //                     <div className="flex items-center justify-center w-1/4">
    //                         <button
    //                             onClick={(e) => {
    //                                 userID.current = [data.id, data.path]
    //                                 handleModalClick(e, setPopUp, setCoordinate)
    //                             }}
    //                             className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
    //                             <FaEllipsisH color='#a19f9a' />
    //                         </button>
    //                         <button
    //                             onClick={() => sidebarlistdispatch({ type: "ADD_PAGE", payload: { path: data.path.concat([data.id]) } })}
    //                             className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
    //                             <FaPlus color='#a19f9a' />
    //                         </button>
    //                     </div>
    //                 </div>
    //             </summary>
    //             <div className="pl-1">
    //                 {children}
    //             </div>
    //         </details>
    //     </div>
    // </div>