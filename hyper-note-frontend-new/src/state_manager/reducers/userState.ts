import { createContext } from "react";
import {v4} from "uuid"

export interface UserList {
    id: string,
    heading: string,
    icon: string,
    cover: string
}

type UserContext = {
    userlist: UserList[]
    theme: string,
    selected: any
    sidebar: boolean
}

let listdata = [{
    "id": "1",
    "heading": "Heading1",
    "icon": "📄",
    "cover": "/images/themes/test2.jpg"
}, {
    "id": "2",
    "heading": "Works",
    "icon": "📄",
    "cover": "/images/themes/test.jpg"
}, {
    "id": "3",
    "heading": "Empty",
    "icon": "📄",
    "cover": ""
}, {
    "id": '4',
    "heading": "Titled",
    "icon": "",
    "cover": "/images/themes/test2.jpg"
}, {
    "id": "5",
    "heading": "Untitled",
    "icon": "",
    "cover": "/images/themes/test2.jpg"
}]

const initialState: UserContext = {
    userlist: listdata,
    theme: "light",
    selected: {},
    sidebar: true
}

function stateFunction(state: UserContext, action: { type: string, payload: any }): UserContext {
    const { type, payload } = action
    switch (type) {
        case "CHANGE_SIDEBAR":
            return {
                ...state,
                sidebar: !state.sidebar
            }

        case "SET_CURRECT_PAGE":
            return {
                ...state,
                selected: payload.current
            }

        case "ADD_PAGE":
            return {
                ...state,
                userlist: [...state.userlist, {
                    id: v4(),
                    heading: "Untitled",
                    icon: '',
                    cover: ""
                }]
            }
        case "UPDATE_ICON":
            let i = state.userlist.findIndex(index => payload.id === index.id)
            if (i === -1) return state
            return {
                ...state,
                selected: {
                    ...state.selected,
                    icon: payload.emoji
                },
                userlist: [...state.userlist.slice(0, i), {
                    ...state.userlist[i],
                    icon: payload.emoji
                }, ...state.userlist.slice(i + 1, state.userlist.length)]
            }
        case "DELETE_LIST":
            const {id} = payload;
            if (!id) return state
            let newlist = state.userlist.filter(val => val.id !== id)
            return {
                ...state,
                selected: (state.selected?.id === id)? {}: state.selected,
                userlist : newlist
            }

    }
    return initialState
}


const userStateContext = createContext<{ state: UserContext, dispatch: Function }>({
    state: initialState,
    dispatch: () => 0
})

export const UserProvider = userStateContext.Provider
export const reducer = stateFunction

export const context = userStateContext
export const defaultState = initialState