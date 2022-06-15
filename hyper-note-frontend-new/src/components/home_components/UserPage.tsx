import { NextComponentType } from 'next'
import React, { useContext } from 'react'
import { context } from '../../state_manager/reducers/userState'
import { FaPlus } from 'react-icons/fa'
import dynamic from 'next/dynamic';
import TextContent from './TextContent';
import { IEmojiData } from 'emoji-picker-react';
import TopBar from './TopBar';
import CoverImage from './CoverImage';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const UserPage: NextComponentType = () => {
    const { state, dispatch } = useContext(context);
    const [isEmojiPackOn, setEmojiPack] = React.useState(false)
    const handleEmoji = (e: React.MouseEvent<Element, MouseEvent>, emojiObj: IEmojiData) => {
        dispatch({ type: 'UPDATE_ICON', payload: {id: state.selected.id, emoji: emojiObj.emoji} })
    }

    return (
        Object.keys(state.selected).length !== 0 ? (
            <div className={`h-full text-2xl font-semibold w-full overflow-y-auto`}>
                <TopBar />
                {state.selected.cover !== "" ? <CoverImage /> : <div className="h-[20vh]"></div>}
                <span className="relative -top-10 left-20" >
                    {state.selected.icon !== '' ?
                        <button onClick={() => setEmojiPack(true)} className='text-6xl'>{state.selected.icon}</button>
                        :
                        <button onClick={() => setEmojiPack(true)}>
                            <abbr title='Add icon'>
                                <div className="opacity-0 hover:opacity-30 rounded-md relative z-10 w-12 h-14 hover:bg-gray-200 flex justify-center items-center">
                                    <FaPlus color="gray" />
                                </div>
                            </abbr>
                        </button>}
                    {isEmojiPackOn ?
                        <div>
                            <div className='fixed z-20 top-0 left-0 w-full h-screen' onClick={() => setEmojiPack(false)}>
                            </div>
                            <div className='absolute z-30' onClick={(e) => e.stopPropagation()}>
                                <Picker onEmojiClick={handleEmoji} ></Picker>
                            </div>
                        </div> : ''}
                </span>
                <TextContent />
            </div>) : <></>
    )
}

export default UserPage