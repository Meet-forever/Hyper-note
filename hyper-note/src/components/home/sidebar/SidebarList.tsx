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
    const [coordinate, setCoordinate] = useState({ x: 0, y: 0 })
    const userID = useRef([]);
    const handleDelete = () => {
        if (userID.current == []) return;
        sidebarlistDispatch({ type: "DELETE_LIST", payload: { id: userID.current[0] } })
        if (prefstate.selected && prefstate.selected.id === userID.current[0]) {
            prefdispatch({ type: "SET_CURRENT_PAGE", payload: { select: {} } })
        }
        setPopUp(false)
    }

    const narray = (userlist: SidebarList[]) => userlist.map((data, index) => {
        return (
            <List
                key={data.id}
                setPopUp={setPopUp}
                setCoordinate={setCoordinate}
                userID={userID}
                data={data}
            >
                {data.children === [] ? <></> : <>{narray(data.children)}</>}
            </List>
        )
    }
    )

    const narrayMapper = (start: number, userlist: SidebarList[], store: SidebarList[], curHeight: number): [number, SidebarList[]] => {
        let i = null
        for (i = start; i < userlist.length; i++) {
            if (userlist[i].path.length === curHeight) {
                store.push(userlist[i])
            }
            else if (userlist[i].path.length > curHeight) {
                const nestedChildren = narrayMapper(i, userlist, [], curHeight + 1)
                store[store.length - 1].children = nestedChildren[1]
                i = nestedChildren[0]
            }
            else {
                return [i - 1, store]
            }
        }
        return [i - 1, store]
    }
    return (
        <div className='h-[74%] sm:h-[73%] bg-[#f7f6f3] flex flex-col items-start justify-start w-full hidescrollx overflow-auto px-3'>
            {narray(narrayMapper(0, [...sidebarlistState], [], 1)[1])}
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
                                <div className='p-2 pb-0 text-xs'>Last edited: </div>
                            </div>
                        </div>
                    </ModalCover>
                    : ''
            }
        </div>
    )
}

export default SidebarList