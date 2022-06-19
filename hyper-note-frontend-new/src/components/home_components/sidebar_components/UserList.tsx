import React, { useContext, useRef, useState } from 'react'
import { context } from '../../../state_manager/reducers/userState';
import { FaEllipsisH, FaPlus, FaTrash, FaStar } from "react-icons/fa"
import ModalCover from '../../modal_components/ModalCover';
import { handleModalClick } from '../../modal_components/modalHandler';
const UserList = () => {
    const { state, dispatch } = useContext(context);
    const [popUp, setPopUp] = useState(false);
    const [coordinate, setcoordinate] = useState({ x: 0, y: 0 })
    const useID = useRef("");
    const handleDelete = () => {
        if (useID.current == "") return;
        dispatch({ type: "DELETE_LIST", payload: { id: useID.current } })
        setPopUp(false)
    }
    return (
        <div className='h-[75%] sm:h-[73%] bg-[#f7f6f3] flex flex-col items-start justify-start w-full overflow-auto px-3'>
            {state.userlist.map((data, index) =>
                <div key={index} className={`w-full justify-between items-center flex ${data.id === state.selected.id ? "bg-gray-200" : ""} hover:bg-gray-200`}>
                    <details className={`text-[#a19f9a] px-2 text-md `} >
                        <summary className='font-semibold px-1 max-w-[9rem] sm:max-w-[11rem] '>
                            <span className='inline-flex gap-x-2 max-w-[5rem] sm:max-w-[7rem]'>
                                <button className='text-sm'> {data.icon !== '' ? data.icon : "📄"} </button>
                                <button className='whitespace-nowrap text-ellipsis overflow-hidden'
                                    onClick={() => dispatch({ type: "SET_CURRECT_PAGE", payload: { current: data } })} >
                                    {data.heading}
                                </button>
                            </span>
                        </summary>
                    </details>
                    <div className="flex items-center justify-center w-1/4">
                        <button
                            onClick={(e) => {
                                useID.current = data.id
                                handleModalClick(e, setPopUp, setcoordinate)
                            }}
                            className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                            <FaEllipsisH color='#a19f9a' />
                        </button>
                        <button
                            className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                            <FaPlus color='#a19f9a' />
                        </button>
                    </div>
                </div>)}
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

export default UserList