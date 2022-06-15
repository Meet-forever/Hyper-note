import { NextPage } from 'next'
import React, { useReducer } from 'react'
import Sidebar from '../components/home_components/Sidebar'
import UserPage from '../components/home_components/UserPage'
import { reducer, defaultState, UserProvider } from '../state_manager/reducers/userState'

const home: NextPage = () => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    return (
        <UserProvider value={{ state, dispatch }} >
            <div className='flex'>
                <Sidebar />
                <div className='h-screen overflow-y-auto w-full'>
                    <UserPage />
                </div>
            </div>
        </UserProvider>
    )
}

export default home

// Grid Version
{/* <div className='grid grid-cols-8 md:grid-cols-6'>
    <Sidebar />
    <UserPage />
</div> */}