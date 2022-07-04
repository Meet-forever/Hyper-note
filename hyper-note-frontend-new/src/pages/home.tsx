import React, { useEffect, useReducer } from 'react'
import Sidebar from '../components/home/Sidebar'
import UserPage from '../components/home/UserPage'
import { UserProvider, reducer, defaultState } from '../state_manager/reducers/userStates'
import { getSession, useSession } from 'next-auth/react'
import Loading from '../components/loading/Loading'
import { MultiContextProvider } from '../state_manager/reducers/index'
import { preferenceReducerFunction, initialPreference } from '../state_manager/reducers/preference'
import { getinitialSidebarList, sideBarListReducerFunction } from '../state_manager/reducers/sidebarList'

const home = ({ session, userlist }: { session: any, userlist: any }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const preference = useReducer(preferenceReducerFunction, initialPreference)
    const sidebarList = useReducer(sideBarListReducerFunction, getinitialSidebarList(userlist))
    const multireducers = {
        preference,
        sidebarList
    }
    // console.log(userlist)
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
    const BEARER = "Bearer " + session.accessToken
    const userlist = await fetch('http://localhost:3000/api/notelist', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization' : BEARER
        }
    }).then(res => res.json()).then(i => i).catch(err => console.error(err.message))
    if(!userlist || !userlist.notes) return {
        redirect : {
            destination: '/',
            permanent: false
        }
    }
    return { props: { session, userlist } };
}

export default home