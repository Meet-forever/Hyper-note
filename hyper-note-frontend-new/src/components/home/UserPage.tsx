import React, { useContext, useState } from 'react'
import { context } from '../../state_manager/reducers/userState'
import { FaPlus } from 'react-icons/fa'
import TextContent from './TextContent';
import TopBar from './TopBar';
import CoverImage from './CoverImage';
import EmojiComponent from '../emoji/EmojiComponent';
import ModalCover from '../modal/ModalCover';
import { handleModalClick } from '../modal/modalHandler';
import { getContext } from '../../state_manager/reducers/userStates';

const UserPage = () => {
    const { state } = getContext();
    const [isEmojiPackOn, setEmojiPack] = useState(false)
    const [coordinate, setcoordinate] = useState({ x: 0, y: 0 })
    return (
        Object.keys(state.selected).length !== 0 ? (
            <div className={`h-full text-2xl font-semibold w-full overflow-y-auto`}>
                <TopBar />
                {state.selected.cover !== "" ? <CoverImage /> : <div className="h-[20vh]"></div>}
                <span className="relative -top-10 left-20" >
                    {state.selected.icon !== '' ?
                        <button onClick={(e) => handleModalClick(e, setEmojiPack, setcoordinate)} className='text-6xl'>{state.selected.icon}</button>
                        :
                        <button onClick={(e) => handleModalClick(e, setEmojiPack, setcoordinate)}>
                            <abbr title='Add icon'>
                                <div className="opacity-0 hover:opacity-30 rounded-md relative z-10 w-12 h-14 hover:bg-gray-200 flex justify-center items-center">
                                    <FaPlus color="gray" />
                                </div>
                            </abbr>
                        </button>}
                    {isEmojiPackOn ?
                        <ModalCover coordinatePos={coordinate} handleClick={setEmojiPack}>
                            <EmojiComponent />
                        </ModalCover>
                        : ''}
                </span>
                <TextContent />
            </div>) : <></>
    )
}

export default UserPage