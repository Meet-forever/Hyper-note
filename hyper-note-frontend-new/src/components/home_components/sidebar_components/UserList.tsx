import React, { useContext, useState } from 'react'
import { context } from '../../../state_manager/reducers/userState';
import { FaEllipsisH, FaPlus } from "react-icons/fa"
import ModalCover from '../../modal_components/ModalCover';

const UserList = () => {
    const { state, dispatch } = useContext(context);
    const [pop, setpop] = useState(false);
    const [coordinate, setcoordinate] = useState({ x: 0, y: 0 })
    const handleModalClick = (e: React.MouseEvent<Element, MouseEvent>) => {
        setpop(i => !i);
        const THRESHOLD = 0.65;
        let  cy = e.clientY, cx = e.clientX;
        const RATIO = cy/window.innerHeight;  
        if(RATIO > THRESHOLD) cy -= Math.floor(cy*(RATIO - THRESHOLD));
        setcoordinate({
            x: cx,
            y: cy
        })
    }
    return (
        <div className='h-[80%] bg-[#f7f6f3] flex flex-col items-start justify-start  overflow-auto p-2'>
            {state.userlist.map((data, index) => <div key={index} className="w-full justify-between items-center flex hover:bg-gray-200">
                <details className="px-2 text-[#a19f9a] w-full text-md cursor-pointer overflow-hidden">
                    <summary className='overflow-clip'>
                        <div className="inline-flex justify-start overflow-x-clip w-4/5 items-center gap-x-1">
                            <button className='text-sm'> {data.icon !== '' ? data.icon : "📄"} </button>
                            <button className="hidescroll w-full flex justify-start items-center rounded-md px-1 text-md font-semibold"
                                onClick={() => dispatch({ type: "SET_CURRECT_PAGE", payload: { current: data } })} >
                                {data.heading}</button>
                        </div>
                    </summary>
                </details>
                <div className="flex items-center justify-center w-1/4">
                    <button
                        onClick={handleModalClick}
                        className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                        <FaEllipsisH color='#a19f9a' />
                    </button>
                    <button
                        className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                        <FaPlus color='#a19f9a' />
                    </button>
                </div>
            </div>)}
            
        </div>
    )
}

export default UserList