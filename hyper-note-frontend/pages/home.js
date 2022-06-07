import React from 'react'
import Sidebar from './components/homeComponents/Sidebar'
import UserPage from './components/homeComponents/UserPage'

export default function home() {
    return (
        <div className='flex'>
            <Sidebar />
            <UserPage />
        </div>
    )
}
