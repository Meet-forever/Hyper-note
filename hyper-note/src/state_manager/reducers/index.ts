import { initialPreference, Preference, PreferenceAction } from "./preference"
import { initialPage, pageReducer, Page } from "./page"
import { createContext, useContext, useReducer, Dispatch } from "react"
import { SidebarList } from "./sidebarList";



interface MultiContextType {
    multiReducer: {
        preference: [Preference, Dispatch<PreferenceAction>];
        page?: [Page, Dispatch<any>];
        sidebarList: [SidebarList[], React.Dispatch<any>];
    }
}

export const multiContext = createContext<undefined | MultiContextType>(undefined)
export const MultiContextProvider = multiContext.Provider

export const getMultiContext = () => {
    const context = useContext(multiContext)
    if (!context) {
        throw new Error("Check the multi context provider.")
    }
    return context
}
