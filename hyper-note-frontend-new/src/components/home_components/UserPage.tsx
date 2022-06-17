import React, { useContext } from 'react'
import { context } from '../../state_manager/reducers/userState'
import { FaPlus } from 'react-icons/fa'
import TextContent from './TextContent';
import TopBar from './TopBar';
import CoverImage from './CoverImage';
import EmojiComponent from '../emoji_component/EmojiComponent';
import ModalCover from '../modal_components/ModalCover';

const UserPage = () => {
    const { state } = useContext(context);
    const [isEmojiPackOn, setEmojiPack] = React.useState(false)
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
                        <ModalCover handleClick={setEmojiPack}>
                            <EmojiComponent />
                        </ModalCover> 
                        : ''}
                </span>
                <TextContent />
            </div>) : <></>
    )
}

export default UserPage