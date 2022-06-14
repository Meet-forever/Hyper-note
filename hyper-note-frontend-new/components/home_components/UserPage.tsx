import { NextComponentType } from 'next'
import React from 'react'

const UserPage:NextComponentType = () => {
    const isOpen = true
    return (
        <div className={`col-span-8 sm:col-span-6 w-full bg-blue-400 ${isOpen? `md:col-span-5`: `md:col-span-6`}`}>
            
        </div>
    )
}

export default UserPage