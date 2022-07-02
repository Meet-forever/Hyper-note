import React, { useContext } from 'react'
import { FaEllipsisH, FaPlus } from 'react-icons/fa'
import { handleModalClick } from '../../modal/modalHandler'
import { context, UserList } from "../../../state_manager/reducers/userState"
import { getContext } from '../../../state_manager/reducers/userStates'


type Props = {
    data: UserList,
    userID: React.MutableRefObject<undefined[]|[string, string[]]>,
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>,
    setCoordinate: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>,
    children: JSX.Element
}

const List = ({ data, userID, setPopUp, setCoordinate, children }: Props) => {
    const { state, dispatch } = getContext()
    return (
        <div className='w-[12rem] sm:w-[14rem]'>
            <div className={`w-full justify-between items-center px-1 flex`}>
                <details className={`text-[#a19f9a] text-sm sm:text-base text-md w-full `}  >
                    <summary className={`px-2 w-full font-semibold ${data.id === state.selected.id ? "bg-gray-200" : ""} hover:bg-gray-200 `}>
                        <div className='inline-flex justify-between w-[88%] sm:w-[91%] '>
                            <span className='flex gap-x-2 w-full'>
                                <button className='text-sm'> {data.icon !== '' ? data.icon : "📄"} </button>
                                <button className='  whitespace-nowrap text-ellipsis overflow-hidden w-full text-left'
                                    onClick={() => dispatch({ type: "SET_CURRECT_PAGE", payload: { current: data } })} >
                                    {data.heading}
                                </button>
                            </span>
                            <div className="flex items-center justify-center w-1/4">
                                <button
                                    onClick={(e) => {
                                        userID.current = [data.id, data.path]
                                        handleModalClick(e, setPopUp, setCoordinate)
                                    }}
                                    className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                                    <FaEllipsisH color='#a19f9a' />
                                </button>
                                <button
                                    onClick={() => dispatch({type: "ADD_PAGE", payload: {path:  data.path.concat([data.id])}})}
                                    className="text-xs p-1 rounded-sm cursor-pointer hover:bg-gray-300">
                                    <FaPlus color='#a19f9a' />
                                </button>
                            </div>
                        </div>
                    </summary>
                    <div className="pl-1">
                    {children}
                    </div>
                </details>
            </div>
        </div>
    )
}

export default List

