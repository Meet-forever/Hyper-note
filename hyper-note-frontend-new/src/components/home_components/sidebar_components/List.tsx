import React, { useContext } from 'react'
import { FaEllipsisH, FaPlus } from 'react-icons/fa'
import { handleModalClick } from '../../modal_components/modalHandler'
import { context, UserList } from "../../../state_manager/reducers/userState"


type Props = {
    data: UserList,
    userID: React.MutableRefObject<string>,
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>,
    setCoordinate: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>
}

const List = ({ data, userID, setPopUp, setCoordinate }: Props) => {
    const { state, dispatch } = useContext(context);
    return (
        <div className={`w-full justify-between items-center flex ${data.id === state.selected.id ? "bg-gray-200" : ""} hover:bg-gray-200`}>
            <details className={`text-[#a19f9a] text-sm sm:text-base px-1 text-md w-3/4 `} >
                <summary className='font-semibold px-1 max-w-[9rem] sm:max-w-[11rem] '>
                    <span className='inline-flex gap-x-2 max-w-[5rem] sm:max-w-[7rem] w-5/6'>
                        <button className='text-sm'> {data.icon !== '' ? data.icon : "📄"} </button>
                        <button className='  whitespace-nowrap text-ellipsis overflow-hidden w-full text-left'
                            onClick={() => dispatch({ type: "SET_CURRECT_PAGE", payload: { current: data } })} >
                            {data.heading}
                        </button>
                    </span>
                </summary>
            </details>
            <div className="flex items-center justify-center w-1/4">
                <button
                    onClick={(e) => {
                        userID.current = data.id
                        handleModalClick(e, setPopUp, setCoordinate)
                    }}
                    className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                    <FaEllipsisH color='#a19f9a' />
                </button>
                <button
                    className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                    <FaPlus color='#a19f9a' />
                </button>
            </div>
        </div>
    )
}

export default List

