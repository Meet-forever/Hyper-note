import { Page } from "./page"
import { SidebarList } from "./sidebarList"

export type Preference = {
    color_mode: string,
    selected: any,
    sidebar: boolean,
    theme_images: string[],
    parent_scroll: boolean
}

export const initialPreference: Preference = {
    color_mode: "light",
    selected: {},
    sidebar: true,
    theme_images: [],
    parent_scroll: true
}

export type PreferenceAction = {
    type: "CHANGE_THEME" | "SET_CURRENT_PAGE" | "CHANGE_SIDEBAR" | "UPDATE_SIDEBAR" | "SCROLL_ON" | "SCROLL_OFF",
    payload?: undefined | {color?: string, select?: any, update?: any}
}

export const preferenceReducerFunction = (state:Preference, action: PreferenceAction): Preference => {
    const {type, payload} = action
    switch(type){
        case "CHANGE_SIDEBAR" :{
            return {
                ...state,  
                sidebar: !state.sidebar
            }
        }
        case "CHANGE_THEME" : {
            return{
                ...state,
                color_mode: payload?.color ?? state.color_mode  
            }
        }
        case "SET_CURRENT_PAGE" : {
            return {
                ...state,
                selected: payload?.select ?? state.selected
            }
        }
        case "UPDATE_SIDEBAR" : {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    ...(payload?.update)
                }
            }
        }
        case "SCROLL_ON" : {
            return{
                ...state,
                parent_scroll: true
            }
        }
        case "SCROLL_OFF" : {
            return{
                ...state,
                parent_scroll: false
            }
        }
        default: return state
    }
}