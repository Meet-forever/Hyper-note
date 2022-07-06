import React, { useEffect, useReducer } from 'react'
import Sidebar from '../components/home/Sidebar'
import UserPage from '../components/home/UserPage'
import { getSession, useSession } from 'next-auth/react'
import Loading from '../components/loading/Loading'
import { MultiContextProvider } from '../state_manager/index'
import { preferenceReducerFunction, initialPreference } from '../state_manager/preference'
import { getinitialSidebarList, sideBarListReducerFunction } from '../state_manager/sidebarList'
import axios from "axios"
const home = ({ session, userlist }: { session: any, userlist: any }) => {
    const preference = useReducer(preferenceReducerFunction, initialPreference)
    const sidebarList = useReducer(sideBarListReducerFunction, getinitialSidebarList(userlist.notes))
    const multireducers = {
        preference,
        sidebarList
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${session.accessToken}`
    const { status, data } = useSession();
    useEffect(() => {
        const updatesidebarlist = setTimeout(() => {
            axios.post("/api/updatesidebarlist", {
                notelist: sidebarList[0]
            })
        }, 2000)
        return () => clearTimeout(updatesidebarlist)
    }, [sidebarList[0]])

    return (
        (!data && status === "loading") ? <><Loading /></> :
            <MultiContextProvider value={{ multiReducer: multireducers }}>
                <div className='flex'>
                    <Sidebar />
                    <div className='h-screen overflow-y-auto w-full'>
                        <UserPage />
                    </div>
                </div>
            </MultiContextProvider>
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
            'Authorization': BEARER
        }
    }).then(res => res.json()).then(i => i).catch(err => console.error(err.message))
    if (!userlist || !userlist.notes) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
    return { props: { session, userlist } };
}

export default home