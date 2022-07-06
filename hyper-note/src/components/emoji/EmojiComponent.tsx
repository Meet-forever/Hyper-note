import { IEmojiData } from 'emoji-picker-react';
import React from 'react'
import dynamic from 'next/dynamic';
import { getMultiContext } from '../../state_manager';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const EmojiComponent = () => {
    const {multiReducer} = getMultiContext()
    const [state, sidebardispatch] = multiReducer.sidebarList
    const [selectedState, prefdispatch] = multiReducer.preference

    const handleEmoji = (e: React.MouseEvent<Element, MouseEvent>, emojiObj: IEmojiData) => {
        sidebardispatch({ type: 'UPDATE_ICON', payload: {id: selectedState.selected.id, emoji: emojiObj.emoji, path: selectedState.selected.path} })
        prefdispatch({type: "UPDATE_SIDEBAR", payload: {update: {icon: emojiObj.emoji}}})
    }
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Picker onEmojiClick={handleEmoji} ></Picker>      
        </div>
    )
}

export default EmojiComponent