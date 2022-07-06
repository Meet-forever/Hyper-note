import React from 'react'
import { FaEllipsisH, FaPlus } from 'react-icons/fa'
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
    children: JSX.Element
}

const List = ({ data, userID, setPopUp, setCoordinate, children }: Props) => {
    const { multiReducer } = getMultiContext()
    const [prefstate, prefdispatch] = multiReducer.preference
    const [_, sidebarlistdispatch] = multiReducer.sidebarList
    const handleCurrentPage = async() => {
        const notes = await pagecache(data.id)
        if(notes) prefdispatch({ type: "SET_CURRENT_PAGE", payload: { select: {...data, notes: notes.notes, ptr: data.id} } })
    }
    return (
        <div className='w-[12rem] sm:w-[12rem]'>
            <div className={`w-full justify-between items-center px-1 flex`}>
                <details className={`text-[#a19f9a] text-sm w-full `}  >
                    <summary className={`px-2 py-[0.2rem] w-full font-semibold ${data.id === prefstate.selected.ptr ? "bg-gray-200" : ""} hover:bg-gray-200 `}>
                        <div className='inline-flex justify-between w-[88%] sm:w-[91%] '>
                            <span className='flex gap-x-2 w-full'>
                                <button className='text-[0.8rem]'> {data.icon !== '' ? data.icon : "📄"} </button>
                                <button className='  whitespace-nowrap text-ellipsis overflow-hidden w-full text-left'
                                    onClick={handleCurrentPage} >
                                    {data.heading}
                                </button>
                            </span>
                            <div className="flex items-center justify-center w-1/4">
                                <button
                                    onClick={(e) => {
                                        userID.current = [data.id, data.path]
                                        handleModalClick(e, setPopUp, setCoordinate)
                                    }}
                                    className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                                    <FaEllipsisH color='#a19f9a' />
                                </button>
                                <button
                                    onClick={() => sidebarlistdispatch({ type: "ADD_PAGE", payload: { path: data.path.concat([data.id])} })}
                                    className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                                    <FaPlus color='#a19f9a' />
                                </button>
                            </div>
                        </div>
                    </summary>
                    <div className="pl-1">
                        {children}
                    </div>
                </details>
            </div>
        </div>
    )
}

export default List

