import React, { useRef, useState } from 'react'
import { FaTrash, FaStar} from "react-icons/fa"
import ModalCover from '../../modal/ModalCover';
import List from './List';
import { getMultiContext } from '../../../state_manager/reducers';
import { SidebarList } from '../../../state_manager/reducers/sidebarList';

const SidebarList = () => {
    const {multiReducer} = getMultiContext()
    const [sidebarlistState, sidebarlistDispatch] = multiReducer.sidebarList
    const [prefstate, prefdispatch] = multiReducer.preference
    const [popUp, setPopUp] = useState(false);
    const [coordinate, setCoordinate] = useState({ x: 0, y: 0 })
    const userID = useRef([]);
    const handleDelete = () => {
        if (userID.current == []) return;
        sidebarlistDispatch({ type: "DELETE_LIST", payload: { id: userID.current[0], path: userID.current[1] } })
        if(prefstate.selected && prefstate.selected.id === userID.current[0]){
            prefdispatch({type: "SET_CURRENT_PAGE", payload: {select: {}} })
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
                data = {data}
                 >
                {data.children === [] ? <></> : <>{narray(data.children)}</>}
            </List>
        )
    }
    )
    return (
        <div className='h-[72%] sm:h-[73%] bg-[#f7f6f3] flex flex-col items-start justify-start w-full hidescroll overflow-auto px-3'>
            {narray(sidebarlistState)}
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