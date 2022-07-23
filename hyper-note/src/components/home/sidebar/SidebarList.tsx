import React, { useRef, useState } from 'react'
import { FaTrash, FaStar } from "react-icons/fa"
import ModalCover from '../../modal/ModalCover';
import List from './List';
import { getMultiContext } from '../../../state_manager';
import { SidebarList } from '../../../state_manager/sidebarList';

const SidebarList = () => {
    const { multiReducer } = getMultiContext()
    const [sidebarlistState, sidebarlistDispatch] = multiReducer.sidebarList
    const [prefstate, prefdispatch] = multiReducer.preference
    const [popUp, setPopUp] = useState(false);
    const [lastEdited, setLastEdited] = useState("")
    const [coordinate, setCoordinate] = useState({ x: 0, y: 0 })
    const userID = useRef([]), dragPicked = useRef({ id: "", path: [] }), dragTarget = useRef({ id: "", path: [] }), dragPosition = useRef("");
    const [dragStart, setDragStart] = useState(false)
    const handleDelete = () => {
        if (userID.current == []) return;
        sidebarlistDispatch({ type: "DELETE_LIST", payload: { id: userID.current[0], path: userID.current[1] } })
        if (prefstate.selected && prefstate.selected.id === userID.current[0]) {
            prefdispatch({ type: "SET_CURRENT_PAGE", payload: { select: {} } })
        }
        setPopUp(false)
    }

    const handleDragEnd = () => {
        setDragStart(false)
        if (!dragPicked.current.id || !dragTarget.current.id || dragPicked.current.id === dragTarget.current.id) {
            dragPicked.current = { id: "", path: [] }
            dragTarget.current = { id: "", path: [] }
            dragPosition.current = ""
            return
        }
        sidebarlistDispatch({ type: "MOVE_CONTENT", payload: { current: dragPicked.current, target: dragTarget.current, position: dragPosition.current } })
        dragPicked.current = { id: "", path: [] }
        dragTarget.current = { id: "", path: [] }
        dragPosition.current = ""
    }

    const narray = (userlist: SidebarList[], padding: number) => userlist.map((data) => {
        return (
            <List
                key={data.id}
                setPopUp={setPopUp}
                setCoordinate={setCoordinate}
                userID={userID}
                data={data}
                padding={padding}
                dragPicked={dragPicked}
                dragTarget={dragTarget}
                dragPosition={dragPosition}
                setLastEdited = {setLastEdited}
                dragStart={dragStart}
            >
                {data.children === [] ? <></> : <>{narray(data.children, padding + 1)}</>}
            </List>
        )
    }
    )
    return (
        <div className='h-[70vh] bg-[#f7f6f3] flex flex-col items-start justify-start w-full hidescrolly pl-2'>
            <div onDragEnd={handleDragEnd} onDragStart={()=> setDragStart(true)} className='w-full'>
                {narray(sidebarlistState, 1)}
            </div>
            {
                popUp ?
                    <ModalCover coordinatePos={coordinate} handleClick={setPopUp} >
                        <div className={`max-w-sm p-2  rounded-md shadow-[8px_2px_50px_-30px_rgba(0,0,0,0.6)] text-sm bg-white  flex flex-col`}>
                            <div className='min-w-[10rem]'>
                                <button
                                    onClick={handleDelete}
                                    className='flex-1 hover:bg-gray-200 p-2 gap-x-4 w-full flex justify-between items-center'>
                                    <div>Delete</div>
                                    <FaTrash color="gray" />
                                </button>
                                <button className='flex-1 hover:bg-gray-200 p-2 gap-x-4 w-full flex justify-between items-center'>
                                    <div>Favorite</div>
                                    <FaStar color="gray" />
                                </button>
                                <div className='p-2 pb-0 text-xs'>Last edited: {lastEdited} </div>
                            </div>
                        </div>
                    </ModalCover>
                    : ''
            }
        </div>
    )
}

export default SidebarList