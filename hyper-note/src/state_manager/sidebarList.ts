import { v4 } from "uuid"
export type SidebarList = {
    id: string,
    heading: string,
    icon: string,
    path: string[],
    cover: string,
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
            const newID = v4()
            const defaultlist = { id: newID, heading: "Untitled", icon: '📄', cover: '', path: ['root'], children: [] }
            const list = { id: newID, heading: "Untitled", icon: '📄', cover: '', path: path, children: [] }
            const addBelow = (index: number) => {
                state.splice(index + 1, 0, list)
                return [...state]
            }
            const addList = () => {
                if (path.length < 1) return state
                let lastindex = null
                for (let i = 0; i < state.length; i++) {
                    if (state[i].id === path[path.length - 1]) lastindex = i
                }
                return (lastindex === null) ? state : addBelow(lastindex)
            }
            return path[path.length - 1] === "root" ? [...state, defaultlist] : addList()
        }

        case "DELETE_LIST": {
            const { id } = payload;
            if (!id) return state
            const index = state.findIndex(i => i.id === id)
            state.splice(index, 1)
            return [...state]
        }
        case "UPDATE_CONTENT": {
            const { id, update } = payload
            if (!id || !update) return state
            const index = state.findIndex(i => i.id === id)
            return [...state.slice(0, index),
            { ...state[index], ...update },
            ...state.slice(index + 1, state.length)]
        }
        case "CHANGE_POSITION": {
            return state
        }
        default: return state
    }
}