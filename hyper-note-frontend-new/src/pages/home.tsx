import { NextPage } from 'next'
import React, { useReducer } from 'react'
import Sidebar from '../components/home/Sidebar'
import UserPage from '../components/home/UserPage'
import { reducer, defaultState, UserProvider } from '../state_manager/reducers/userState'
import { getSession } from 'next-auth/react'

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

export async function getServerSideProps(context:any){
    const session = await getSession(context);
    console.log(session?.user)
    if(!session) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}

// Grid Version
{/* <div className='grid grid-cols-8 md:grid-cols-6'>
    <Sidebar />
    <UserPage />
</div> */}