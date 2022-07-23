import { Preference, PreferenceAction } from "./preference"
import { Page, PageAction } from "./page"
import { createContext, useContext, Dispatch } from "react"
import { SidebarList } from "./sidebarList";



interface MultiContextType {
    multiReducer: {
        preference: [Preference, Dispatch<PreferenceAction>];
        page: [Page, Dispatch<PageAction>];
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
