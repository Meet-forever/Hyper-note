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
            const temp = [...path];
            const appendPage = (arrobj: SidebarList[]): SidebarList[] => {
                const val = (temp.length == 0) ? "" : temp.shift();
                if (val === "") {
                    const id = v4()
                    return [...arrobj, { id: id, heading: "Untitled", icon: '📄', cover: '', path: path, children: [] }]
                }
                else {
                    return arrobj.map((data) => (data.id === val) ? { ...data, children: appendPage(data.children) } : data)
                }
            }
            return appendPage(state)
        }
        case "DELETE_LIST": {
            const { id, path } = payload;
            if (!id || !path) return state
            const filterobj = (arrobj: SidebarList[], id: string) => {
                const target = (path.length !== 0) ? path.shift() : "";
                for (let i = 0; i < arrobj.length; i++) {
                    const current = arrobj[i];
                    if (target == "" && current.id == id) {
                        arrobj.splice(i, 1);
                        break;
                    } else if (target == current.id) {
                        filterobj(current.children, id);
                        break;
                    }
                }
            }
            filterobj(state, id);
            return [...state]
        }
        case "UPDATE_CONTENT": {
            const { id, update, path } = payload
            if (!id || !update || !path) return state
            const temp = [...path].reverse()
            const updateIcon = (arrobj: SidebarList[]): SidebarList[] => {
                const val = (temp.length == 0) ? "" : temp.pop()
                if (val === "") {
                    return arrobj.map((data) => (data.id === id) ? { ...data, ...update } : data)
                } else {
                    return arrobj.map((data) => (data.id === val) ? { ...data, children: updateIcon(data.children) } : data)
                }
            }
            return updateIcon(state)
        }
        default: return state
    }
}