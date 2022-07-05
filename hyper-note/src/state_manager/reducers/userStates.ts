import { createContext, useContext } from "react";
import { v4 } from "uuid"


export interface UserList {
    id: string,
    heading: string,
    icon: string,
    cover: string,
    isOpen: boolean,
    path: string[],
    childdata: UserList[]
}

export type UserContext = {
    userlist: UserList[]
    theme: string,
    selected: any
    sidebar: boolean
}

let listdata = [{
    "id": "1",
    "heading": "Heading1",
    "icon": "📄",
    "isOpen": false,
    "path": [],
    "cover": "/images/themes/test2.jpg",
    "childdata": [{
        "id": "7",
        "heading": "Heading2",
        "icon": "📄",
        "isOpen": false,
        "path": ["1"],
        "cover": "/images/themes/test.jpg",
        "childdata": [{
            "id": "8",
            "heading": "Heading3",
            "icon": "📄",
            "isOpen": false,
            "path": ["1", "7"],
            "cover": "/images/themes/test.jpg",
            "childdata": [{
                "id": "9",
                "heading": "Heading4",
                "icon": "📄",
                "isOpen": false,
                "path": ["1", "7", "8"],
                "cover": "/images/themes/test.jpg",
                "childdata": [{
                    "id": "10",
                    "heading": "Heading5",
                    "icon": "📄",
                    "isOpen": false,
                    "path": ["1", "7", "8", "9"],
                    "cover": "/images/themes/test.jpg",
                    "childdata": [{
                        "id": "11",
                        "heading": "Heading6",
                        "icon": "📄",
                        "isOpen": false,
                        "path": ["1", "7", "8", "9", "10"],
                        "cover": "/images/themes/test.jpg",
                        "childdata": [{
                            "id": "12",
                            "heading": "Heading7",
                            "icon": "📄",
                            "isOpen": false,
                            "path": ["1", "7", "8", "9", "10", "11"],
                            "cover": "/images/themes/test.jpg",
                            "childdata": []
                        }]
                    }]
                }]
            }]
        }]
    },
    {
        "id": "13",
        "heading": "Heading8",
        "icon": "📄",
        "isOpen": false,
        "path": ["1"],
        "cover": "/images/themes/test.jpg",
        "childdata": []
    }]
}, {
    "id": "2",
    "heading": "Works",
    "icon": "📄",
    "isOpen": false,
    "path": [],
    "cover": "/images/themes/test.jpg",
    "childdata": []
}, {
    "id": "3",
    "heading": "Empty",
    "icon": "📄",
    "isOpen": false,
    "path": [],
    "cover": "",
    "childdata": []
}, {
    "id": '4',
    "heading": "Titled",
    "icon": "",
    "isOpen": false,
    "path": [],
    "cover": "/images/themes/test2.jpg",
    "childdata": []
}, {
    "id": "5",
    "heading": "Untitled",
    "icon": "",
    "isOpen": false,
    "path": [],
    "cover": "/images/themes/test2.jpg",
    "childdata": []
}]

const initialState: UserContext = {
    userlist: listdata,
    theme: "light",
    selected: {},
    sidebar: true,
}

function stateFunction(state: UserContext, action: { type: string, payload: any }): UserContext {
    const { type, payload } = action
    switch (type) {
        case "CHANGE_SIDEBAR": {
            return {
                ...state,
                sidebar: !state.sidebar
            }
        }

        case "SET_CURRECT_PAGE": {
            return {
                ...state,
                selected: payload.current
            }
        }

        case "ADD_PAGE": {
            const { path } = payload;
            if (!path) return state;
            const temp = [...path];

            const appendPage = (arrobj: UserList[]): UserList[] => {
                const val = (temp.length == 0) ? "" : temp.shift();
                if (val === "") return [...arrobj, { id: v4(), heading: "Untitled", icon: '', cover: "", isOpen: false, path: path, childdata: [] }]
                else {
                    return arrobj.map((data) => (data.id === val) ? { ...data, childdata: appendPage(data.childdata) } : data)
                }
            }

            return {
                ...state,
                userlist: appendPage(state.userlist)
            }
        }

        case "UPDATE_ICON": {
            const { id, emoji, path } = payload
            if (!id || !emoji || !path) return state
            const temp = [...path]
            const updateIcon = (arrobj: UserList[]): UserList[] => {
                const val = (temp.length == 0) ? "" : temp.shift();
                if (val === "") {
                    return arrobj.map((data) => (data.id === id) ? { ...data, icon: emoji } : data)
                } else {
                    return arrobj.map((data) => (data.id === val) ? { ...data, childdata: updateIcon(data.childdata) } : data)
                }
            }
            return {
                ...state,
                selected: { ...state.selected, icon: emoji },
                userlist: updateIcon(state.userlist)
            }
        }

        case "DELETE_LIST": {
            const { id, path } = payload;
            if (!id || !path) return state
            const filterobj = (arrobj: UserList[], id: string) => {
                const target = (path.length !== 0) ? path.shift() : "";
                for (let i = 0; i < arrobj.length; i++) {
                    const current = arrobj[i];
                    if (target == "" && current.id == id) {
                        arrobj.splice(i, 1);
                        break;
                    } else if (target == current.id) {
                        filterobj(current.childdata, id);
                        break;
                    }
                }
            }
            filterobj(state.userlist, id);
            return {
                ...state,
                selected: (state.selected?.id === id) ? {} : state.selected,
            }
        }

    }
    return initialState
}

interface ContextType { state: UserContext, dispatch: Function } 

export const userContext = createContext<undefined|ContextType>(undefined);

export const UserProvider = userContext.Provider

export const getContext = () => {
    const makeContext = useContext(userContext);
    if(!makeContext) throw new Error("Check UserProvider");
    return makeContext
}
export const reducer = stateFunction
export const defaultState = initialState