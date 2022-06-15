import React, { useContext } from 'react'
import { FaBars, FaPlus } from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'
import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { context } from '../../state_manager/reducers/userState';
import { IEmojiData } from 'emoji-picker-react';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const TopBar: NextComponentType = () => {
    const { state, dispatch } = useContext(context)
    const [isEmojiPackOn, setEmojiPack] = React.useState(false)
    const handleEmoji = (e: React.MouseEvent<Element, MouseEvent>, emojiObj: IEmojiData) => {
        dispatch({ type: 'UPDATE_ICON', payload: {id: state.selected.id, emoji: emojiObj.emoji} })
    }
    return (
        <div className={`${state.sidebar ? 'px-20' : 'px-14'} flex justify-between bg-white w-full items-center py-1 text-lg text-gray-600`}>
            <div className="flex justify-center items-center gap-x-2">
                {!state.sidebar && <button onClick={() => dispatch({ type: "" })}><FaBars color="#a19f9a" /></button>}
                {state.selected.icon !== '' ?
                    <button onClick={() => setEmojiPack(true)} className="text-sm">
                        {state.selected.icon}
                    </button>
                    :
                    <button onClick={() => setEmojiPack(true)} className='text-sm opacity-0 hover:opacity-20'><FaPlus color="#a19f9a" /></button>}
                {isEmojiPackOn ?
                    <div>
                        <div className='fixed z-20 top-0 left-0 w-full h-screen' onClick={() => setEmojiPack(false)}>
                        </div>
                        <div className='absolute z-30' onClick={(e) => e.stopPropagation()}>
                            <Picker onEmojiClick={handleEmoji} ></Picker>
                        </div>
                    </div> : ''}
                <h1 className='text-[#a19f9a]'>{state.selected.heading}</h1>
            </div>
            <div className="flex justify-center items-center gap-x-2">
                <button><FiShare color="#a19f9a" /></button>
            </div>
        </div>
    )
}
export default TopBar