import React, { useContext } from 'react'
import Image from 'next/image'
import { NextComponentType } from 'next'
import { context } from '../../state_manager/reducers/userState'
const CoverImage: NextComponentType = () => {
    const { state } = useContext(context)
    console.log(state.selected.cover)
    return (
        <div className="h-[30vh] w-full relative">
            <Image src={state.selected.cover} alt="pattern" layout='fill' objectFit='cover' />
        </div>
    )
}
export default CoverImage