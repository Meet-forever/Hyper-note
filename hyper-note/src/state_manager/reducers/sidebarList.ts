import { getSession } from "next-auth/react"
import { v4 } from "uuid"
export type SidebarList = {
    id: string,
    heading: string,
    icon: string,
    path: string[],
    file: Promise<string> | string,
    children: SidebarList[],
}


export const getinitialSidebarList = (initialSidebarList: SidebarList[]): SidebarList[] => {
    return initialSidebarList
}


export const sideBarListReducerFunction = (state: SidebarList[], action: any) => {
    const { type, payload } = action
    switch (type) {
        case "ADD_PAGE": {
            const { path } = payload
            if (!path) return state;
            const temp = [...path];
            const id = v4()
            const fptr = async () => {
                const ptr = await createPage(id).then(val => val)
                if (!ptr) fptr()
                return ptr
            }
            const appendPage = (arrobj: SidebarList[]): SidebarList[] => {
                const val = (temp.length == 0) ? "" : temp.shift();
                if (val === "") {
                    return [...arrobj, { id: id, heading: "Untitled", icon: '📄', file: fptr(), path: path, children: [] }]
                }
                else {
                    return arrobj.map((data) => (data.id === val) ? { ...data, children: appendPage(data.children) } : data)
                }
            }
            const newState = appendPage(state)
            updatePage(newState)
            return newState
        }
        case "DELETE_LIST": {
            const { id, path } = payload;
            if (!id || !path) return state
            const filterobj = (arrobj: SidebarList[], id: string) => {
                const target = (path.length !== 0) ? path.shift() : "";
                for (let i = 0; i < arrobj.length; i++) {
                    const current = arrobj[i];
                    if (target == "" && current.id == id) {
                        deletePage(current.file)
                        arrobj.splice(i, 1);
                        break;
                    } else if (target == current.id) {
                        filterobj(current.children, id);
                        break;
                    }
                }
            }
            filterobj(state, id);
            updatePage(state)
            return state
        }
        default: return state
    }
}


const createPage = async (creation_id: string): Promise<string> => {
    const session = await getSession()
    const BEARER = "Bearer " + session?.accessToken
    try {
        const page = await fetch("http://localhost:3000/api/createPage", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': BEARER
            },
            body: JSON.stringify({
                ptr: creation_id
            })
        }).then(res => res.json())
        return page.page_id
    } catch (e) {
        console.error(e)
    }
    return ""

}

const updatePage = async (newNoteList: SidebarList[]) => {
    const session = await getSession()
    const BEARER = "Bearer " + session?.accessToken
    try {
        await fetch("http://localhost:3000/api/updatesidebarlist", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': BEARER
            },
            body: JSON.stringify({
                notelist: newNoteList
            })
        })
    } catch (e) {
        console.error(e)
    } 
}

const deletePage  = async(pageID: string | Promise<string>) => {
    const session = await getSession()
    const BEARER = "Bearer " + session?.accessToken
    if (pageID) {
        try {
            await fetch("http://localhost:3000/api/deletepage", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': BEARER
                },
                body: JSON.stringify({
                    page_id: await pageID 
                })
            })
        } catch (e) {
            console.error(e)
        }
    }
}