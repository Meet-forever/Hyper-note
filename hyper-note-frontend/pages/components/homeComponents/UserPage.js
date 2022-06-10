import React from 'react'
import CoverImage from './CoverImage'
import TextContent from './TextContent';
import TopBar from './TopBar'
import { FaPlus } from 'react-icons/fa'
import { UserContext } from '../../home'
import dynamic from 'next/dynamic';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export default function UserPage({ isOpen, setOpen, selected, setSelected }) {
    const userContext = React.useContext(UserContext);
    const [isEmojiPackOn, setEmojiPack] = React.useState(false)
    const handleEmoji = (e, emojiObj) => {
        console.log(selected.id)
        userContext.userDispatch({type:'UPDATE_ICON', payload:selected.id, emoji: emojiObj.emoji, setSelected: setSelected})
    }

    return (
        Object.keys(selected).length !== 0 ? (
            <div className="h-full text-2xl font-semibold w-full overflow-y-auto" >
                <TopBar isOpen={isOpen} setOpen={setOpen} selected={selected} />
                {selected.cover !== '' ? <CoverImage selected={selected} /> : <div className="h-[20vh]"></div>}
                <span className="relative -top-10 left-20" >
                    {selected.icon !== '' ?
                        <button onClick={() => setEmojiPack(true)} className='text-6xl'>{selected.icon}</button>
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
                                    <Picker onClick={(e) => e.stopPropagation()} onEmojiClick={handleEmoji} ></Picker>
                                </div>
                        </div> : ''}
                </span>
                <TextContent selected={selected} setSelected={setSelected} />
            </div >) : <></>
    )
}
