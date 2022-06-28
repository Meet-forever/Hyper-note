import React, { useReducer } from 'react'
import Sidebar from '../components/home/Sidebar'
import UserPage from '../components/home/UserPage'
import { reducer, defaultState, UserProvider } from '../state_manager/reducers/userState'
import { getSession, useSession } from 'next-auth/react'
import Loading from '../components/loading/Loading'

const home = ({session}:{session:any}) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    // console.log(session)
    const {status, data} =  useSession();

    return (
        (!data && status==="loading")?<><Loading /></>:
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
    if(!session) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
    return {props:{session}};
}

// Grid Version
{/* <div className='grid grid-cols-8 md:grid-cols-6'>
    <Sidebar />
    <UserPage />
</div> */}