import { IEmojiData } from 'emoji-picker-react';
import React, { useContext } from 'react'
import { context } from '../../state_manager/reducers/userState';
import dynamic from 'next/dynamic';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const EmojiComponent = () => {
    const { state, dispatch } = useContext(context);
    const handleEmoji = (e: React.MouseEvent<Element, MouseEvent>, emojiObj: IEmojiData) => {
        dispatch({ type: 'UPDATE_ICON', payload: {id: state.selected.id, emoji: emojiObj.emoji} })
    }
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Picker onEmojiClick={handleEmoji} ></Picker>      
        </div>
    )
}

export default EmojiComponent