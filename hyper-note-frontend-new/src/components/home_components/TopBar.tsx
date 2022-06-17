import React, { useContext } from 'react'
import { FaBars, FaPlus } from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'
import { context } from '../../state_manager/reducers/userState';
import EmojiComponent from '../emoji_component/EmojiComponent';
import ModalCover from '../modal_components/ModalCover';

const TopBar = () => {
    const { state, dispatch } = useContext(context)
    const [isEmojiPackOn, setEmojiPack] = React.useState(false)
    
    return (
        <div className={`${state.sidebar ? 'px-20' : 'px-14'} flex justify-between bg-white w-full items-center py-1 text-lg text-gray-600`}>
            <div className="flex justify-start items-center gap-x-2 w-[50%] overflow-x-auto hidescroll">
                {!state.sidebar && <button onClick={() => dispatch({ type: "CHANGE_SIDEBAR" })}><FaBars color="#a19f9a" /></button>}
                {state.selected.icon !== '' ?
                    <button onClick={() => setEmojiPack(true)} className="text-sm">
                        {state.selected.icon}
                    </button>
                    :
                    <button onClick={() => setEmojiPack(true)} className='text-sm opacity-0 hover:opacity-20'><FaPlus color="#a19f9a" /></button>}
                {isEmojiPackOn ?
                    <ModalCover handleClick={setEmojiPack}>
                        <EmojiComponent/>
                    </ModalCover> : ''}
                <h1 className='text-[#a19f9a]'>{state.selected.heading}</h1>
            </div>
            <div className="flex justify-center items-center gap-x-2">
                <button><FiShare color="#a19f9a" /></button>
            </div>
        </div>
    )
}
export default TopBar