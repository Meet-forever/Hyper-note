import React, { useState } from 'react'
import { FaBars, FaCog, FaPlus } from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'
import { getMultiContext } from '../../state_manager';
import EmojiComponent from '../emoji/EmojiComponent';
import ModalCover from '../modal/ModalCover';
import { handleModalClick } from '../modal/modalHandler';

const TopBar = () => {
    const {multiReducer} = getMultiContext()
    const [state, prefdispatch] = multiReducer.preference
    const [isEmojiPackOn, setEmojiPack] = useState(false)
    const [coordinate, setcoordinate] = useState({ x: 0, y: 0 })
    return (
        <div className={`${state.sidebar ? 'px-20' : 'px-14'} flex justify-between bg-white w-full items-center py-1 text-lg text-gray-600`}>
            <div className="flex justify-start items-center gap-x-2 w-[50%] overflow-x-auto hidescroll">
                {!state.sidebar && <button onClick={() => prefdispatch({ type: "CHANGE_SIDEBAR" })}><FaBars color="#a19f9a" /></button>}
                {state.selected.icon !== '' ?
                    <button type="button" title='Edit Icon' onClick={(e) => handleModalClick(e, setEmojiPack, setcoordinate)} className="text-sm">
                        {state.selected.icon}
                    </button>
                    :
                    <button type="button" title='Edit Icon' onClick={(e) => handleModalClick(e, setEmojiPack, setcoordinate)} className='text-sm opacity-0 hover:opacity-20'><FaPlus color="#a19f9a" /></button>}
                {isEmojiPackOn ?
                    <ModalCover coordinatePos={coordinate} handleClick={setEmojiPack}>
                        <EmojiComponent />
                    </ModalCover> : ''}
                <h1 className='overflow-hidden whitespace-nowrap text-ellipsis text-sm text-[#a19f9a]'>{state.selected.heading}</h1>
            </div>
            <div className="flex justify-center items-center gap-x-4">
                <button type='button' title="Share"><FiShare color="#a19f9a" /></button>
                <button type='button' title="Settings"><FaCog color="#a19f9a" /></button>
            </div>
        </div>
    )
}
export default TopBar