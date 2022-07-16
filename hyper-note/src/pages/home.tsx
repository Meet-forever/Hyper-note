import React, { useEffect, useReducer } from 'react'
import Sidebar from '../components/home/Sidebar'
import UserPage from '../components/home/UserPage'
import { getSession, useSession } from 'next-auth/react'
import Loading from '../components/loading/Loading'
import { MultiContextProvider } from '../state_manager/index'
import { preferenceReducerFunction, initialPreference } from '../state_manager/preference'
import { getinitialSidebarList, sideBarListReducerFunction } from '../state_manager/sidebarList'
import axios from "axios"
import { getToken } from 'next-auth/jwt'
const home = ({ token, userlist, theme_images }: { token: any, userlist: any, theme_images: string[] }) => {
    const preference = useReducer(preferenceReducerFunction, { ...initialPreference, theme_images: theme_images })
    const sidebarList = useReducer(sideBarListReducerFunction, getinitialSidebarList(userlist.notes))
    const multireducers = {
        preference,
        sidebarList
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.accessToken}`
    const { status, data } = useSession();
    useEffect(() => {
        const updatesidebarlist = setTimeout(() => {
            axios.post("/api/updatesidebarlist", {
                notelist: sidebarList[0],
                provider: token.provider
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
    const theme_images = [
        'i1.jpg', 'mt-fuji.jpg',
        'onepiece.jpg', 'samurai.jpg',
        'store.jpg', 'test.jpg',
        'test1.jpg', 'test2.jpg',
        'test3.jpg', 'test4.jpg',
        'test5.jpg', 'test6.png',
        'wave.jpg'
    ]
    // const path = await import("path")
    // const fs = await import("fs/promises")
    // const imgfolder = path.join(
    //     ...(__dirname
    //     .split(path.sep)
    //     .slice(0, -3)
    //     .concat(["public", "images", "themes"])))
    // console.log(await fs.readdir(imgfolder))
    const {req} = context
    const secret = process.env.SECRET
    const token = await getToken({req: req, secret: secret});
    if (!token) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
    const BEARER = "Bearer " + token.accessToken
    const userlist = await fetch(`${process.env.NEXTAUTH_URL}/api/notelist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': BEARER
        },
        body: JSON.stringify({
            provider: token.provider
        })
    }).then(res => res.json()).then(i => i).catch(err => console.error(err.message))
    if (!userlist || !("notes" in userlist)) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
    return { props: { token, userlist, theme_images } };
}

export default home