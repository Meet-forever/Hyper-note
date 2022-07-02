import React, { useReducer } from 'react'
import Sidebar from '../components/home/Sidebar'
import UserPage from '../components/home/UserPage'
import { UserProvider, reducer, defaultState } from '../state_manager/reducers/userStates'
import { getSession, useSession } from 'next-auth/react'
import Loading from '../components/loading/Loading'
import { MultiContextProvider } from '../state_manager/reducers/index'
import { preferenceReducerFunction, initialPreference } from '../state_manager/reducers/preference'

const home = ({ session }: { session: any }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const preference = useReducer(preferenceReducerFunction, initialPreference)
    const multireducers = {
        preference
    }
    const { status, data } = useSession();
    
    return (
        (!data && status === "loading") ? <><Loading /></> :
            <UserProvider value={{ state, dispatch }} >
            <MultiContextProvider value={{ multiReducer: multireducers }}>
                <div className='flex'>
                    <Sidebar />
                    <div className='h-screen overflow-y-auto w-full'>
                        <UserPage />
                    </div>
                </div>
            </MultiContextProvider>
            </UserProvider>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
    return { props: { session } };
}

export default home