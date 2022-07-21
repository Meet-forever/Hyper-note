import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import TextContent from './TextContent';
import TopBar from './TopBar';
import CoverImage from './CoverImage';
import EmojiComponent from '../emoji/EmojiComponent';
import ModalCover from '../modal/ModalCover';
import { handleModalClick } from '../modal/modalHandler';
import { getMultiContext } from '../../state_manager';

const UserPage = () => {
    const { multiReducer } = getMultiContext()
    const [state, _] = multiReducer.preference
    const [isEmojiPackOn, setEmojiPack] = useState(false)
    const [coordinate, setcoordinate] = useState({ x: 0, y: 0 })
    return (
        Object.keys(state.selected).length !== 0 ? (
            <div className='h-screen w-full overflow-hidden'>
                <TopBar />
                <div className={` h-screen text-2xl font-semibold w-full overflow-y-auto`}>
                    <CoverImage />
                    <span className="relative -top-10 left-20" >
                        {state.selected.icon !== '' ?
                            <button type="button" title="Edit Icon" onClick={(e) => handleModalClick(e, setEmojiPack, setcoordinate)} className='text-6xl relative z-10'>{state.selected.icon}</button>
                            :
                            <button type="button" title="Add Icon" onClick={(e) => handleModalClick(e, setEmojiPack, setcoordinate)}>
                                <div className="opacity-0 hover:opacity-30 rounded-md relative z-10 w-12 h-14 hover:bg-gray-200 flex justify-center items-center">
                                    <FaPlus color="gray" />
                                </div>
                            </button>}
                        {isEmojiPackOn ?
                            <ModalCover coordinatePos={coordinate} handleClick={setEmojiPack}>
                                <EmojiComponent />
                            </ModalCover>
                            : ''}
                    </span>
                    <TextContent />
                </div>
            </div>) : <></>
    )
}

export default UserPage